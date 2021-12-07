import http from "http";
import createError from "http-errors";
import express from "express";
import logger from "morgan";
import path from "path";
import { config } from "dotenv";

import db from "../db";
import { checkPort } from "../utils/server";
import { ErrnoException } from "../http";

config();

export const port = checkPort(process.env.port);
const app = express();
const server = http.createServer(app);

app
  .set("db", db)
  .set("port", port)
  .use(require("cors")())
  .set("view engine", "html")
  .use(express.static(path.join(__dirname, "web")))
  .use(logger("dev"))

  .use(express.json())
  .use(
    express.urlencoded({
      extended: false,
    })
  )
  .use(function (req, res, next) {
    /* get 404 error */
    next(createError(404));
  });

server.on("error", (error: ErrnoException) => {
  if (error.syscall !== "listen") throw error;

  let bind = (typeof port === "string" ? "Pipe" : "Port") + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} 需要更高全縣`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} 已使用`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on("listening", () => {
  let addr = server.address();
  let bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`is ready ${bind}`);
});

export default server;
