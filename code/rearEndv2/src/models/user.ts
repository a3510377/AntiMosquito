import { Document, Schema, model } from "mongoose";

export interface userType extends Document {
  id: string;
  name?: string;
  description?: string;
  location: { /**緯度 */ latitude?: number; /**經度 */ longitude?: number };
  area: {
    /**縣 */
    county?: string;
    /**區 */
    town?: string;
    /**里 */
    village?: string;
  };
}

export const userSchema = new Schema<userType>({
  id: { type: String, required: true, unique: true },
  name: String,
  description: String,
  location: { longitude: Number, latitude: Number },
  area: { county: String, town: String, village: String },
});

export default model<userType>("userSchema", userSchema);
