import { Document, Schema, model } from "mongoose";

export interface dataType extends Document {
  Location: { longitude: number; latitude: number };
}

export const guildSchema = new Schema<dataType>({
  Location: { longitude: Number, latitude: Number },
});

export default model<dataType>("data", guildSchema);
