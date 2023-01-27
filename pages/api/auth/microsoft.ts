import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { MicrosoftProviderModel, MicrosoftCacheModel } from "models";
import connectMongoose from "libs/connectMongoose";
import { acquireTokenByCode, getAuthCodeUrl, setCCA } from "libs/microsoftAuth";

const APP_URI = process.env.APP_URI;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session) throw new createHttpError.Unauthorized();

    await connectMongoose();
    await setCCA(MicrosoftCacheModel);

    switch (req.method) {
      case "POST": {
        const code = req.body.code as string;
        const tokenData = await acquireTokenByCode(code);
        const provider = await MicrosoftProviderModel.findOneAndUpdate(
          {},
          {
            accountId: tokenData.account.homeAccountId,
            username: tokenData.account.username,
            isVerified: true,
          }
        );
        const url = `${APP_URI}/${provider.redirectUri}`;
        return res.json(url);
      }
      default:
        throw new createHttpError.MethodNotAllowed();
    }
  } catch (error) {
    console.error(error);
    return res.status(error.status ?? 500).json(error);
  }
};

export default handler;
