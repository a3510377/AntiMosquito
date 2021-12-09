import express from "express";
import fs from "fs";
import path from "path";
import API from "./API";

const router = express.Router();

router.use("/api", API).get("/", (req, res) => {
  res
    // .status(200)
    // .set({ "Content-Type": "text/html" })
    .render("index");
});

export default router;
