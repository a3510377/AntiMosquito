import express from "express";
import API from "./API";
import Errors from "./errors";

const router = express.Router();

router
  .use("/api", API)
  .get("/", (_req, res) => res.send("awa"))
  .use(Errors);

export default router;
