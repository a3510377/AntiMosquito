/* /v1 */
import express from "express";
import postImg from "./postImg";

const router = express.Router();

router
  .get("/", (_req, res) => res.status(200).json({ v: 1 }))
  .use("/postImg", postImg);

export default router;
