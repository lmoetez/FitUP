import { IUser } from "models";
import mongoose, { Model, Schema, PopulatedDoc } from "mongoose";

export interface IMicrosoftProvider {
  accountId: string;
  username: string;
  isVerified: boolean;
  redirectUri: string;
  user: PopulatedDoc<IUser & Document>;
}

const MicrosoftProviderSchema = new Schema(
  {
    accountId: String,
    username: String,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    isVerified: Boolean,
    redirectUri: String,
  },
  { timestamps: true, versionKey: false }
);
export const MicrosoftProviderModel: Model<IMicrosoftProvider> =
  mongoose.models?.MicrosoftProvider ||
  mongoose.model("MicrosoftProvider", MicrosoftProviderSchema);
