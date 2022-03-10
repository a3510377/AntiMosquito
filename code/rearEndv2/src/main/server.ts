import { Server, createServer } from "http";
import express from "express";

import { checkPort } from "../utils/string";

export let port: number = checkPort(process.env.PORT);

export class server {
  public app = express();
  public server: Server = createServer(this.app);
  constructor() {}
}
