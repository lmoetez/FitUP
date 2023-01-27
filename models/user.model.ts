import mongoose, { Model } from "mongoose";

export const rolesOption = ["Admin", "Professeur", "Etudiant"] as const;
export type IRole = typeof rolesOption[number];

export interface IUser {
  firstName: string;
  lastName: string;
  phone: string;
  role: IRole;
  email: string;
  password: string;
  isDeleted: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    role: { type: String, enum: rolesOption, default: "Etudiant" },
    email: { type: String, lowercase: true },
    password: { type: String, select: false },
    isDeleted: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

export const UserModel: Model<IUser> = mongoose.models?.User || mongoose.model("User", userSchema);
