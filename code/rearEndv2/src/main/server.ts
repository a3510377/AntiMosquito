import express, { Express } from "express";
import { Server, createServer } from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";

import { dbServer } from "./db";
import { wsServer } from "./gateway";
import { checkPort } from "../utils/string";
import routers from "../router";

export let port: number = checkPort(process.env.PORT);

config();

export class server {
  public app: Express = express();
  public server: Server = createServer(this.app);
  public db: dbServer = new dbServer(this);
  public ws: wsServer = new wsServer(this);
  public config = { db: { uri: process.env.dbUri } };
  constructor() {
    this.server
      .on("error", (error: ErrnoException) => {
        if (error.syscall !== "listen") throw error;

        let bind = (typeof port === "string" ? "Pipe" : "Port") + port;

        switch (error.code) {
          case "EACCES":
            console.error(`${bind} 需要更高全縣`);
            this.server.listen(++port);
            break;
          case "EADDRINUSE":
            console.error(`${bind} 已使用`);
            this.server.listen(++port);
            break;
          default:
            throw error;
        }
      })
      .on("listening", async () => {
        let addr = this.server.address();
        let bind =
          typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
        console.log(`is ready ${bind}`);
      });
  }
  /**start */
  public async start() {
    this.init();
    await mongoose
      .connect(this.config.db.uri)
      .then(() => console.log("資料庫連接完成"))
      .catch(() => console.log("資料庫連接錯誤"));
  }
  public init() {
    this.app
      .set("view engine", "html")
      .set("db", this.db)
      .set("ws", this.ws)
      .set("port", port)
      .use(require("cors")())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(logger("dev"))
      .use("/", express.static(path.join(__dirname, "../web")))
      .get("/uptimerobot", (_req, res) => {
        res.status(200).send();
        console.info("uptimerobot check");
      })

      .use(routers);
  }
}

export interface ErrnoException extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}
