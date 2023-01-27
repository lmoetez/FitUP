import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { ClassModel } from "models";
import connectMongoose from "libs/connectMongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoose();

    const classId = req.query.classId as string;
    if (!classId) throw new createHttpError.BadRequest("No class id");

    switch (req.method) {
      case "GET": {
        const _class = await ClassModel.findOne({ _id: classId, isDeleted: false });
        return res.json(_class);
      }
      case "PUT": {
        await ClassModel.findOneAndUpdate({ _id: classId }, req.body);
        return res.json("updated");
      }
      case "DELETE": {
        await ClassModel.findOneAndUpdate({ _id: classId }, { isDeleted: true });
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
