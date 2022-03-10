import { Document, Schema, model } from "mongoose";

export interface dataType extends Document {}

export const guildSchema = new Schema<dataType>();

export default model<dataType>("data", guildSchema);
