import mongoose, { Model, Schema } from "mongoose";

export interface IMicrosoftCache {
  data: any
}
const MicrosoftCacheSchema = new Schema(
  {
    data: Schema.Types.Mixed,
  },
  { timestamps: true, versionKey: false }
);
export const MicrosoftCacheModel: Model<IMicrosoftCache> =
  mongoose.models?.MicrosoftCache ||
  mongoose.model("MicrosoftCache", MicrosoftCacheSchema);
