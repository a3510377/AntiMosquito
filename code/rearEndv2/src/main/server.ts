import express, { Express } from "express";
import { Server, createServer } from "http";
import { config } from "dotenv";
import mongoose from "mongoose";

import { dbServer } from "./db";
import { wsServer } from "./gateway";

import { checkPort } from "../utils/string";

export let port: number = checkPort(process.env.PORT);

config();

export class server {
  public app: Express = express();
  public server: Server = createServer(this.app);
  public db: dbServer = new dbServer(this);
  public ws: wsServer = new wsServer(this);
  public config = { db: { uri: process.env.dbUri } };
  /**start */
  public async start() {
    await mongoose
      .connect(this.config.db.uri)
      .then(() => console.log("資料庫連接完成"))
      .catch(() => console.log("資料庫連接錯誤"));
  }
}
