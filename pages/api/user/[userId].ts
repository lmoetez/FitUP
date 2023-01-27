import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { UserModel } from "models";
import connectMongoose from "libs/connectMongoose";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session) throw new createHttpError.Unauthorized("No session");

    await connectMongoose();

    const userId = req.query.userId as string;
    if (!userId) throw new createHttpError.BadRequest("No user id");

    switch (req.method) {
      case "GET": {
        const users = await UserModel.findOne({ _id: userId, isDeleted: false });
        return res.json(users);
      }
      case "PUT": {
        const user = await UserModel.findOne({ email: req.body.email, _id: { $ne: userId } });
        if (user) throw new createHttpError.Conflict("Email exist");

        let password;
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(req.body.password, salt);
        }

        await UserModel.findOneAndUpdate({ _id: userId }, { ...req.body, password });
        return res.json("updated");
      }
      case "DELETE": {
        await UserModel.findOneAndUpdate({ _id: userId }, { isDeleted: true });
        return res.json("deleted");
      }

      default:
        throw new createHttpError.MethodNotAllowed();
    }
  } catch (error) {
    return res.status(error.status ?? 500).json(error);
  }
};

export default handler;
