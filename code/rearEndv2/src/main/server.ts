import { Server, createServer } from "http";
import express from "express";

import { checkPort } from "../utils/string";
import { dbServer } from "./db";

export let port: number = checkPort(process.env.PORT);

export class server {
  public app = express();
  public server: Server = createServer(this.app);
  public db: dbServer = new dbServer(this);
  /**創建用戶 */
  public async createUser(name: string, description?: string) {
    return await (
      await this.db.model.UserModel.create({ name, description }).catch()
    )
      ?.save()
      .catch(() => false);
  }
  public async findUser() {}
}
