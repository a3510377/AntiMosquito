import express from "express";
import dbType from "@/db";
import { dataMosquitos, dbDataMosquitos } from "@/types/db.data";
import { getIp, getVillage } from "@/utils/axios";

const router = express.Router();

router
  .get("/data", async (req, res) => {
    let db = req.app.get("db") as dbType;
    let data = {};
    await Promise.all(
      (
        await db.Mosquitos.collections()
      ).map(async (site) =>
        (
          await site.find().toArray()
        ).forEach((info) => {
          delete info._id;
          let area = info.location.area;
          let _t = `${area.county}${area.town}${area.village}`;
          data[_t] ||= [];
          data[_t].push(info);
        })
      )
    );
    res.json(data);
  })
  .post("/postData", async (req, res) => {
    let body = req.body as { [IP: string]: dataMosquitos[] };
    let authorization = req.headers["authorization"] as string;

    if (body.constructor !== Object)
      return res.status(400).json({
        messages: "參數錯誤",
        parametric: {
          data: {
            "IP: string": [
              {
                time: "時間: string | number",
                humidity: "濕度: number",
                mosquitos: "蚊子數量: number",
                temperature: "溫度: number",
              },
            ],
          },
          headers: { authorization: "token: string" },
        },
        code: 0,
      });
    let db = req.app.get("db") as dbType;

    /* TODO: 添加type */
    let userInfo = (await db.checkToken(authorization)) as any;
    if (!userInfo) return res.status(401).json({ message: "密鑰錯誤" });

    let data: dbDataMosquitos[] = [];
    await Promise.all(
      Object.entries(body).map(async ([_ip, value]) => {
        let ipData = await getIp(_ip);
        if (!ipData) return;
        let info = await getVillage(ipData.longitude, ipData.latitude);
        if (!info) return;
        return value.map((_key) => {
          if (!info) return;
          if (!ipData) return;
          for (let chick of ["time", "humidity", "mosquitos", "temperature"])
            if (!_key?.[chick]) return console.log(chick);
          data.push({
            time: _key.time,
            humidity: _key.humidity,
            mosquitos: _key.mosquitos,
            temperature: _key.temperature,
            location: {
              location: {
                longitude: ipData.longitude,
                latitude: ipData.latitude,
              },
              area: {
                county: info.ctyName,
                town: info.townName,
                village: info.villageName,
              },
            },
          });
        });
      })
    );

    data.length > 0 &&
      db.Mosquitos.collection(userInfo._id.toString()).insertMany(data);
    res.json(data);
  });

export default router;
