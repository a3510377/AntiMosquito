import { Document, Schema, model } from "mongoose";

export interface userType extends Document {
  name: string;
  description?: string;
}

export const userSchema = new Schema<userType>({
  name: { type: String, require: true },
  description: String,
});

export default model<userType>("data", userSchema);
