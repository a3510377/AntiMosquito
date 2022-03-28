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
    let id = `${+new Date()}${server}`;
    server.db.createUser({
      name: "",
      description: "",
      area: {
        county: "",
        town: "",
        village: "",
      },
    });
  });

export default router;
