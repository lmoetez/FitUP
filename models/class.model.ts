import mongoose, { Model } from "mongoose";

export const classLevel = ["7eme", "8eme", "9eme", "1ere", "2eme", "3eme", "4eme"] as const;
export type ILevel = typeof classLevel[number];
export const subjectOption = ["Mathematique"] as const;
export type ISubject = typeof subjectOption[number];

export interface IClass {
  classLevel: ILevel;
  subject: ISubject;
  annualPrice: number;
  monthlyPrice: number;
  schoolYear: string;

  isDeleted: boolean;
}

const classSchema = new mongoose.Schema<IClass>(
  {
    classLevel: { type: String, enum: classLevel },
    subject: { type: String, enum: subjectOption },
    annualPrice: Number,
    monthlyPrice: Number,
    schoolYear: String,

    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

export const ClassModel: Model<IClass> =
  mongoose.models?.Class || mongoose.model("Class", classSchema);
