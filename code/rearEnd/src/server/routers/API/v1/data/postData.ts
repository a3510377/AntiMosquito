import express from "express";
import dbType from "@/db";

const router = express.Router();

router
  .post("/postData", async (req, res) => {
    let headers = req.headers;
    if (!headers["Authorization"]) res.status(400).json({});
    let db = req.app.get("db") as dbType;
    let data = await db.checkToken(headers["Authorization"] as string);
    console.log(data);
  })
  .get("/postData", async (req, res) => {
    let query = req.query;
    if (!query["Authorization"]) res.status(400).json({});
    let db = req.app.get("db") as dbType;
    /* TODO: 添加type */
    let data = (await db.checkToken(query["Authorization"] as string)) as any;
    db.Mosquitos.collection(data._id).insertMany([]);
    res.json(data);
  });

export default router;
