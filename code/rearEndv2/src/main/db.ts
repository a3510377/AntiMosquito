import { FilterQuery } from "mongoose";

import DataModel from "../models/data";
import UserModel, { userType } from "../models/user";

import { server } from "./server";

export class dbServer {
  public model = { DataModel, UserModel };
  constructor(public server: server) {}
  /**創建用戶 */
  public async createUser(name: string, description?: string) {
    return await (await UserModel.create({ name, description }).catch())
      ?.save()
      .catch(() => false);
  }
  public async findUser(find: FilterQuery<userType>) {
    return await UserModel.findOne(find);
  }
}
