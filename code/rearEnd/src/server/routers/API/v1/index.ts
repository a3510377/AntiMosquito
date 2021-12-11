import express from "express";
import { getIp } from "../../../../utils/axios";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).json({ v: 1 });
  })
  .get("/setup", async (req, res) => {
    // url ex: /setup?ip=1.1.1.1
    const ip: string = req.query.ip as string;
    let data = await getIp(ip);
    if (!data) return res.status(400).send("無 ip 參數");
    res.send();
  });

export default router;
