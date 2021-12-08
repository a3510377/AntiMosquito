import express from "express";
import fs from "fs";
import path from "path";
import API from "./API";

const router = express.Router();

router.use(API).get("/", (req, res) => {
  try {
    res
      .status(200)
      .set({ "Content-Type": "text/html" })
      .end(fs.readFileSync(path.join(__dirname, "../web/index.html"), "utf-8"));
  } catch (e) {
    res.status(500).end(e.message);
  }
});

export default router;
