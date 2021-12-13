import express from "express";
import dbType from "@/db";

const router = express.Router();

router.post("/postData", async (req, res) => {
  let headers = req.headers;
  if (!headers["Authorization"]) res.status(400).json({});
  let db = req.app.get("db") as dbType;
});

export default router;
