import http from "http";
import createError from "http-errors";
import express from "express";
import logger from "morgan";
import path from "path";
import { config } from "dotenv";

import routers from "./routers";
import serverDb from "../db";
import { checkPort } from "../utils/server";
import { ErrnoException } from "../http";

config();

export const port = checkPort(process.env.port);
const app = express();
const server = http.createServer(app);
const db = new serverDb();

app
  .engine("html", require("ejs").renderFile)
  .set("view engine", "html")
  .set("db", db)
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

  .use(routers)

  .use(function (req, res, next) {
    /* get 404 error */
    next(createError(404));
  })
  .use(function (err, req, res, next) {
    /* error handler */
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    console.log(err.status || 500);
    res.render("error");
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
