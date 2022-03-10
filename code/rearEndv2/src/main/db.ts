import { FilterQuery, AnyObject, AnyKeys } from "mongoose";

import DataModel, { dataType } from "../models/data";
import UserModel, { userType } from "../models/user";

import { server } from "./server";

export class dbServer {
  public model = { DataModel, UserModel };
  constructor(public server: server) {}
  /**創建用戶 */
  public async createUser(data: AnyObject | AnyKeys<userType>) {
    return await (await UserModel.create(data).catch())?.save().catch();
  }
  /**尋找用戶 */
  public async findUser(find: FilterQuery<userType>) {
    return await UserModel.findOne(find).catch();
  }
  /**創建資料 */
  public async createData(data: AnyObject | AnyKeys<dataType>) {
    return await (await DataModel.create(data).catch())?.save().catch();
  }
  /**尋找資料 */
  public async findData(find: FilterQuery<dataType>) {
    return await DataModel.findOne(find).catch();
  }
}
