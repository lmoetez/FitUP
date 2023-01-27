import mongoose, { Model, PopulatedDoc, Document, Schema } from "mongoose";
import { IClass, IUser } from ".";

export const dayOption = [
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
  "dimanche",
] as const;
export type IDay = typeof dayOption[number];

export interface SessionTime {
  hour: number;
  minute: number;
}
export interface SessionDate {
  day: IDay;
  from: SessionTime;
  to: SessionTime;
}

export interface IGroup {
  name: string;
  class: PopulatedDoc<IClass & Document>;
  prof: PopulatedDoc<IUser & Document>;
  sessionPerWeek: number;
  sessionDates: SessionDate[];
  start: Date;
  end: Date;

  isDeleted: boolean;
}

const groupSchema = new Schema<IGroup>(
  {
    name: String,
    class: { type: Schema.Types.ObjectId, ref: "Class" },
    prof: { type: Schema.Types.ObjectId, ref: "User" },
    sessionPerWeek: Number,
    sessionDates: [
      {
        day: { type: String, enum: dayOption },
        from: { hour: String, minute: String },
        to: { hour: String, minute: String },
      },
    ],
    start: Date,
    end: Date,

    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

export const GroupModel: Model<IGroup> =
  mongoose.models?.Group || mongoose.model("Group", groupSchema);
