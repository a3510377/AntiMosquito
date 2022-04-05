import { Document, Schema, model } from "mongoose";

export interface dataType extends Document {
  userId: string;
  /**時間( timestamp ) */
  time: Date;
  /**濕度( % ) */
  humidity?: number;
  /**蚊子數量 */
  mosquitos: number;
  /**溫度( 度 ) */
  temperature?: number;
}

export const dataSchema = new Schema<dataType>({
  userId: { type: String, required: true },
  time: { type: Date, default: new Date() },
  mosquitos: { type: Number, default: 1 },
  humidity: Number,
  temperature: Number,
});

export default model<dataType>("data", dataSchema);
