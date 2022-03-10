import http, { Server } from "http";
import express from "express";

import { checkPort } from "../utils/string";

export let port: number = checkPort(process.env.PORT);
const app = express();

export class server {
  server: Server;
  constructor() {
    http.createServer(app);
  }
}
