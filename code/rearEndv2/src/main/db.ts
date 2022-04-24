import {
  FilterQuery,
  AnyObject,
  AnyKeys,
  UpdateQuery,
  UpdateWithAggregationPipeline,
  QueryOptions,
} from "mongoose";

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
  public async editUser(
    find: FilterQuery<userType>,
    update?: UpdateQuery<userType> | UpdateWithAggregationPipeline,
    options?: QueryOptions
  ): Promise<ReturnType<typeof UserModel.updateOne>> {
    return await UserModel.updateOne(find, update, options).catch();
  }
  /**創建資料 */
  public async createData(data: AnyObject | AnyKeys<dataType>) {
    this.model.DataModel.emit("updata", data);
    return await (await DataModel.create(data).catch())?.save().catch();
  }
  /**尋找資料 */
  public async findData(find: FilterQuery<dataType>) {
    return await DataModel.findOne(find).catch();
  }
}
