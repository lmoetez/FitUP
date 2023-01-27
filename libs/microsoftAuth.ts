import "isomorphic-fetch";

import * as Msal from "@azure/msal-node";
import { Client } from "@microsoft/microsoft-graph-client";

import { Configuration } from "@azure/msal-node/dist/config/Configuration";
import { IConfidentialClientApplication } from "@azure/msal-node/dist/client/IConfidentialClientApplication";

const MICROSOFT_REDIRECT_URI = process.env.MICROSOFT_REDIRECT_URI;
const MICROSOFT_SCOPES = process.env.MICROSOFT_SCOPES?.split(",");
const MICROSOFT_CLIENT_ID = process.env.MICROSOFT_CLIENT_ID;
const MICROSOFT_AUTHORITY = process.env.MICROSOFT_AUTHORITY;
const MICROSOFT_CLIENT_SECRET = process.env.MICROSOFT_CLIENT_SECRET;

let cca: IConfidentialClientApplication;

export async function setCCA(model): Promise<void> {
  const msalConfig: Configuration = {
    auth: {
      clientId: MICROSOFT_CLIENT_ID,
      authority: MICROSOFT_AUTHORITY,
      clientSecret: MICROSOFT_CLIENT_SECRET,
    },
    system: {
      loggerOptions: {
        loggerCallback(loglevel, message, containsPii) {
          console.log(message);
        },
        piiLoggingEnabled: false,
        logLevel: Msal.LogLevel.Verbose,
      },
    },
    cache: {
      cachePlugin: {
        beforeCacheAccess: async (cacheContext) => {
          let data = await model.findOne();
          if (!data?.data) {
            const res = await model.updateOne(
              {},
              { data: cacheContext.tokenCache.serialize() },
              { upsert: true }
            );
          } else {
            cacheContext.tokenCache.deserialize(data?.data);
          }
        },
        afterCacheAccess: async (cacheContext) => {
          if (cacheContext.cacheHasChanged) {
            const res = await model.updateOne(
              {},
              { data: cacheContext.tokenCache.serialize() },
              { upsert: true }
            );
          }
        },
      },
    },
  };
  cca = new Msal.ConfidentialClientApplication(msalConfig);
}

export async function getAuthCodeUrl(prompt: "login" | "select_account" = "login"): Promise<any> {
  const authCodeUrlParameters = {
    scopes: MICROSOFT_SCOPES,
    redirectUri: MICROSOFT_REDIRECT_URI,
    prompt,
  };
  return cca.getAuthCodeUrl(authCodeUrlParameters);
}

export async function acquireTokenByCode(code: string): Promise<any> {
  const tokenRequest = {
    code,
    scopes: MICROSOFT_SCOPES,
    redirectUri: MICROSOFT_REDIRECT_URI,
  };

  return cca.acquireTokenByCode(tokenRequest);
}

export async function acquireTokenSilent(accountId: string): Promise<any> {
  const msalTokenCache = cca.getTokenCache();
  const account = await msalTokenCache.getAccountByHomeId(accountId);
  const tokenRequest = {
    account,
    scopes: MICROSOFT_SCOPES,
  };

  return cca.acquireTokenSilent(tokenRequest);
}

export async function getAuthenticatedClient(accountId) {
  if (!cca || !accountId) {
    throw new Error(
      `Invalid MSAL state. Client: ${cca ? "present" : "missing"}, User ID: ${
        accountId ? "present" : "missing"
      }`
    );
  }

  // Initialize Graph client
  const client = Client.init({
    // Implement an auth provider that gets a token
    // from the app's MSAL instance
    authProvider: async (done) => {
      try {
        const res = await acquireTokenSilent(accountId);
        done(null, res.accessToken);
      } catch (err) {
        done(err, null);
      }
    },
  });

  return client;
}
