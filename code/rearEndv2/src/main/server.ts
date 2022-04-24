import express, { Express } from "express";
import { Server, createServer } from "http";
import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import fs from "fs";

import { dbServer } from "./db";
import { wsServer } from "./gateway";
import { checkPort } from "../utils/string";
import routers from "../router";
import { setInterval } from "timers";
import axios from "axios";
import path from "path";

config();

export class server {
  public app: Express = express();
  public server: Server = createServer(this.app);
  public db: dbServer = new dbServer(this);
  public ws: wsServer = new wsServer(this);
  public config = { db: { uri: process.env.dbUri } };
  public pin: number = 0;
  public port: number = checkPort(process.env.PORT);
  public data: { postImg: { [key: string]: ReturnType<typeof setTimeout> } } = {
    postImg: {},
  };
  constructor() {
    process.on("uncaughtException", (er: unknown) =>
      console.error(er.toString().slice(0, 1e4 * 20))
    );
    this.server
      .on("error", (error: ErrnoException) => {
        if (error.syscall !== "listen") throw error;

        let bind =
          (typeof this.port === "string" ? "Pipe" : "Port") + this.port;

        switch (error.code) {
          case "EACCES":
            console.error(`${bind} 需要更高全縣`);
            this.server.listen(++this.port);
            break;
          case "EADDRINUSE":
            console.error(`${bind} 已使用\n正在更換 port`);
            this.server.listen(++this.port);
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
      .connect(process.env.mongodbUri)
      .then(() => console.log("資料庫連接完成"))
      .catch(() => console.log("資料庫連接錯誤"));

    this.server.listen(process.env.PORT || 3500);

    setInterval(this.getData.bind(this), 1e3 * 60 * 60);
    this.getData();
  }
  public async getData() {
    const { data } = <{ data: ApiAgeCountyGender061[] }>await axios({
      url: "https://od.cdc.gov.tw/eic/Age_County_Gender_061.json",
    });
    let dictData: {
      [yarn: string]: {
        F?: ApiAgeCountyGender061[];
        M?: ApiAgeCountyGender061[];
      };
    } = {};
    let seriesData: {
      F: { [yarn: string]: number };
      M: { [yarn: string]: number };
    } = { F: {}, M: {} };
    let FMData: { [year: string]: { [month: string]: number } } = {};

    data.forEach((v) => {
      v["發病年份"] = v["發病年份"].toString().padStart(4, "0");
      v["發病月份"] = v["發病月份"].toString().padStart(2, "0");
      ((dictData[v["發病年份"]] ||= {})[v["性別"]] ||= []).push({
        發病日: v["發病日"],
        性別: v["性別"],
        確定病例數: v["確定病例數"],
      });
      let _ = (FMData[v["發病年份"]] ||= {});
      _[v["發病月份"]] ||= 0;
      _[v["發病月份"]] += +v["確定病例數"];
    });
    Object.entries(dictData).forEach(([key, value]) => {
      seriesData.F[key] = value["F"].length;
      seriesData.M[key] = value["M"].length;
    });

    try {
      fs.writeFileSync("./data/FMData.json", JSON.stringify(FMData));
      fs.writeFileSync("./data/seriesData.json", JSON.stringify(seriesData));
    } catch (e) {
      console.error(e);
    }
  }
  public init() {
    this.app
      .set("view engine", "html")
      .set("db", this.db)
      .set("ws", this.ws)
      .set("main", this)
      .set("port", this.port)
      .use(cors())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      .use(logger("dev"))
      .use("/data", express.static(path.join(__dirname, "../../data")))
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
export interface ApiAgeCountyGender061 {
  發病日: string;
  性別: "F" | "M";
  確定病例數: string;
  [key: string]: string;
}
