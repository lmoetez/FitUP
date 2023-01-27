import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { ClassModel } from "models";
import connectMongoose from "libs/connectMongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoose();

    switch (req.method) {
      case "GET": {
        const classes = await ClassModel.find({ isDeleted: false });
        return res.json(classes);
      }
      case "POST": {
        const newClass = await ClassModel.create(req.body);
        return res.json(newClass);
      }

      default:
        throw new createHttpError.MethodNotAllowed();
    }
  } catch (error) {
    return res.status(error.status ?? 500).json(error);
  }
};

export default handler;
