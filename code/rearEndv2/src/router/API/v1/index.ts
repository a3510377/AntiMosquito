/* /v1 */
import { server } from "@/main/server";
import express from "express";
import postImg from "./postImg";

const router = express.Router();

router
  .get("/", (_req, res) => res.status(200).json({ v: 1 }))
  .use("/postImg", postImg)
  .post("/makeId", (req) => {
    let server: server = <server>req.app.get("main");
    server.pin >= 9;
    let id = `${+new Date()}${0}`;
    server.db.createUser({ id });
  });

export default router;
