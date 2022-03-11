import { Document, Schema, model } from "mongoose";

export interface dataType extends Document {
  /**時間( timestamp1-timestamp2 ) */
  time?: `${string}-${string}`;
  /**濕度( % ) */
  humidity: number;
  /**蚊子數量 */
  mosquitos?: number;
  /**溫度( 度 ) */
  temperature?: number;
}

export const dataSchema = new Schema<dataType>({
  time: Date,
  humidity: { type: Number, default: 1 },
  mosquitos: Number,
  temperature: Number,
});

export default model<dataType>("data", dataSchema);
