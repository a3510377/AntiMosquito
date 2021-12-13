import express from "express";
import { getIp } from "@/utils/axios";
import dbType from "@/db";
import { makeId, makeToken } from "@/utils/uuid";

const router = express.Router();

/* 創建帳號 */
router
  /* 創建帳號 - 開始 */
  .get("/setup", async (req, res) => {
    // url ex: /setup?ip=1.1.1.1
    const ip: string = req.query.ip as string;
    if (!ip) return res.status(400).send("無 ip 參數");
    let ipData = await getIp(ip);
    if (!ipData) return res.status(400).send("ip 錯誤");

    let db = req.app.get("db") as dbType;
    let checks_catch = (db.catch.api.checks[ip] = {
      token: makeToken(makeId(0)),
      timeOut: setTimeout(() => delete db.catch.api.checks[ip], 1e3 * 60 * 5),
      ipData,
    });

    res.send(checks_catch.token);
  })
  /* 創建帳號 - 確認 */
  .get("/check", async (req, res) => {
    const ip: string = req.query.ip as string;
    const token: string = req.query.token as string;
    let db = req.app.get("db") as dbType;
    let checks = db.catch.api.checks;

    if (!ip || !token || !Object.keys(checks).includes(ip))
      return res.status(400).send("參數錯誤");

    let thisCatch = checks[ip];
    if (thisCatch.token != token) return res.status(401).send("token 錯誤");
    clearTimeout(thisCatch.timeOut);

    res.send(
      await db.addSite(
        thisCatch.ipData.longitude,
        thisCatch.ipData.latitude,
        thisCatch.ipData.ip
      )
    );
  });

export default router;
