import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { GroupModel } from "models";
import connectMongoose from "libs/connectMongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoose();

    const groupId = req.query.groupId as string;
    if (!groupId) throw new createHttpError.BadRequest("No group id");

    switch (req.method) {
      case "GET": {
        const group = await GroupModel.findOne({ _id: groupId, isDeleted: false }).populate([
          "class",
          "prof",
        ]);
        return res.json(group);
      }
      case "PUT": {
        await GroupModel.findOneAndUpdate({ _id: groupId }, req.body);
        return res.json("updated");
      }
      case "DELETE": {
        await GroupModel.findOneAndUpdate({ _id: groupId }, { isDeleted: true });
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
