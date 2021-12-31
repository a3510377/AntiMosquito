import http from "http";
import express from "express";
import logger from "morgan";
import path from "path";
import { config } from "dotenv";

import routers from "./routers";
import serverDb from "@/db";
import { checkPort } from "@/utils/server";
import { ErrnoException } from "@/http";
import ws from "./gateway";

config();

export let port: number = checkPort(process.env.PORT);
const app = express();
const server = http.createServer(app);
const wss = new ws({ server });
const db = new serverDb(wss);

app
  .engine("html", require("ejs").renderFile)
  .set("view engine", "html")
  .set("db", db)
  .set("ws", wss)
  .set("port", port)
  .use(require("cors")())
  .use(express.json())
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use(logger("dev"))
  .use("/", express.static(path.join(__dirname, "../web")))
  .get("/uptimerobot", (req, res) => {
    res.status(200).send();
    console.info("uptimerobot check");
  })

  .use(routers);

server.on("error", (error: ErrnoException) => {
  if (error.syscall !== "listen") throw error;

  let bind = (typeof port === "string" ? "Pipe" : "Port") + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} 需要更高全縣`);
      server.listen(++port);
      break;
    case "EADDRINUSE":
      console.error(`${bind} 已使用`);
      server.listen(++port);
      break;
    default:
      throw error;
  }
});
server.on("listening", async () => {
  try {
    await db.run();
  } catch (e) {
    console.error(`MongoDB Error:\n\t${e.name}: ${e.message}`);
  }

  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`is ready ${bind}`);
});

export default server;
