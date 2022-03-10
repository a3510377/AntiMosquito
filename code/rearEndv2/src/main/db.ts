import DataModel from "../models/data";
import UserModel from "../models/user";

import { server } from "./server";

export class serverDb {
  public model = {
    DataModel,
    UserModel,
  };
  constructor(public server: server) {}
}
