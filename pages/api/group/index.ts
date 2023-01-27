import { NextApiRequest, NextApiResponse } from "next";
import createHttpError from "http-errors";
import { GroupModel, MicrosoftCacheModel, MicrosoftProviderModel } from "models";
import connectMongoose from "libs/connectMongoose";
//import { setCCA } from "libs/microsoftAuth";
// import { createEventMeeting } from "libs/microsoftGraph";
// import { dayOption } from "models/group.model";
import { set } from "date-fns";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongoose();

    switch (req.method) {
      case "GET": {
        const groups = await GroupModel.find({ isDeleted: false }).populate(["class", "prof"]);
        return res.json(groups);
      }
      case "POST": {
        //await setCCA(MicrosoftCacheModel);

        //const provider = await MicrosoftProviderModel.findOne().lean();

        //const { body } = req;

        // const promise = [];
        // body.sessionDates.map((sessionDate) => {
        //   const start = set(new Date(body.start), {
        //     hours: parseInt(sessionDate.from.hour),
        //     minutes: parseInt(sessionDate.from.minute),
        //   });
        //   const end = set(new Date(body.start), {
        //     hours: parseInt(sessionDate.to.hour),
        //     minutes: parseInt(sessionDate.to.minute),
        //   });

        // promise.push(
        //   createEventMeeting(provider, {
        //     attendees: [],
        //     start: {
        //       dateTime: start,
        //       timeZone: body.timeZone,
        //     },
        //     end: {
        //       dateTime: end,
        //       timeZone: body.timeZone,
        //     },
        //     recurrence: {
        //       pattern: {
        //         type: "weekly",
        //         interval: 1,
        //         daysOfWeek: [daysOfWeek[dayOption.indexOf(sessionDate.day)]],
        //       },
        //       range: {
        //         type: "endDate",
        //         startDate: body.start,
        //         endDate: body.end,
        //       },
        //     },
        //     isOnlineMeeting: true,
        //   })
        // );
        // });
        // await Promise.all(promise);

        const newGroup = await GroupModel.create(req.body);
        console.log(newGroup);
        return res.json(newGroup);
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
