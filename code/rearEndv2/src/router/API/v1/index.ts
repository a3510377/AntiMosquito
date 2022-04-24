/* /v1 */
import { server } from "@/main/server";
import express from "express";
import postImg from "./postImg";
import users from "./users";
import map from "./map";

const router = express.Router();

router
  .get("/", (_req, res) => res.status(200).json({ v: 1 }))
  .use("/postImg", postImg)
  .post("/makeId", (req, res) => {
    let server: server = <server>req.app.get("main");
    server.pin = server.pin >= 9 ? 0 : server.pin + 1;
    let id = `${+new Date()}${server.pin}`;
    server.db.createUser({ id });
    res.send(id);
  })
  .use("/users", users)
  .use("/map", map);

export default router;
