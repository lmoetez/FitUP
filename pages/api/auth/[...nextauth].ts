import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { UserModel } from "models";
import connectMongoose from "libs/connectMongoose";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { compareAsc } from "date-fns";

//Authorize function for sign in with credentials
const authorize = async (
  credentials: Record<"email" | "password", string>,
  req: NextApiRequest
) => {
  await connectMongoose();
  const { email, password } = credentials;

  // Verify user
  const user = await UserModel.findOne({
    email: email.toLowerCase(),
    isDeleted: { $in: false },
  }).select("+password");
  if (!user) throw new createHttpError.BadRequest("Incorrect email or password");

  const hash = user.password;

  // Verifiy password
  const isSame = await bcrypt.compare(password, hash);
  if (!isSame) throw new createHttpError.BadRequest("Incorrect email or password");

  return {
    id: user._id,
    name: user.firstName + " " + user.lastName,
    email: user.email,
    role: user.role,
  };
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    // Configure one or more authentication providers
    providers: [
      CredentialsProviders({
        name: "Credentials",
        credentials: {
          email: { label: "email", type: "email" },
          password: { label: "password", type: "password" },
        },
        authorize,
      }),
    ],
    pages: {
      signIn: "/signin",
    },
    callbacks: {
      async jwt({ token, user }: any) {
        delete token.email;
        if (user) token.user = user;
        return token;
      },
      async session({ session, token }: any) {
        session.user = token?.user;
        return session;
      },
    },
    secret: process.env.SECRET_NEXTAUTH,
    jwt: {
      // A secret to use for key generation. Defaults to the top-level `secret`.
      maxAge: 60 * 60 * 24 * 30,
    },
    debug: true,
  });
}
