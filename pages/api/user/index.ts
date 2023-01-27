import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { getSession } from "next-auth/react";
import { UserModel } from "models";
import connectMongoose from "libs/connectMongoose";
import bcrypt from "bcryptjs";
import { rolesOption } from "models/user.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session) throw new createHttpError.Unauthorized("No session");

    await connectMongoose();

    switch (req.method) {
      case "GET": {
        const type = req.query.type as string;

        const users = await UserModel.find({
          isDeleted: false,
          ...(type?.length ? { role: { $in: ["Admin", "Professeur"] } } : {}),
        });
        return res.json(users);
      }
      case "POST": {
        const user = await UserModel.findOne({ email: req.body.email });
        if (user) throw new createHttpError.Conflict("Email exist");

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const newUser = await UserModel.create({ ...req.body, password });
        return res.json(newUser);
      }

      default:
        throw new createHttpError.MethodNotAllowed();
    }
  } catch (error) {
    console.log(error);
    return res.status(error.status ?? 500).json(error);
  }
};

export default handler;
