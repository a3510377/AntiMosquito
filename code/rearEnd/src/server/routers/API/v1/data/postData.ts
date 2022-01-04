import express from "express";
import dbType from "@/db";
import { dataMosquitos, dbDataMosquitos } from "@/types/db.data";
import { getIp, getVillage } from "@/utils/axios";
import { villageAPIData } from "@/types/axios.data";

const router = express.Router();

async function nowData(
  req: express.Request,
  res: express.Response,
  body: dataMosquitos & { ip: string },
  authorization: string
) {
  if (body.constructor !== Object)
    return res.status(400).json({
      messages: "參數錯誤",
      parametric: {
        data: {
          ip: "IP",
          time: "時間: string | number | undefined",
          humidity: "濕度: number",
          mosquitos: "蚊子數量: number",
          temperature: "溫度: number",
        },
        headers: { authorization: "token: string" },
      },
      code: 0,
    });
  let db = req.app.get("db") as dbType;

  /* TODO: 添加type */
  let userInfo = (await db.checkToken(authorization)) as any;
  if (!userInfo) return res.status(401).json({ message: "密鑰錯誤" });
  let info: villageAPIData | false;
  if (body.ip !== "114.529.1.1") {
    let ipData = await getIp(body.ip);
    if (!ipData) return res.status(400).json({ message: "IP錯誤" });
    info = await getVillage(ipData.longitude, ipData.latitude);
  } else {
    info = {
      ctyName: "臺南市",
      townName: "仁德區",
      villageName: "仁德里",
      error: null,
    };
  }

  if (!info) return res.status(400).json({ message: "IP 錯誤" });
  let data: dbDataMosquitos = void 0;
  for (let chick of ["humidity", "mosquitos", "temperature"])
    if (!body?.[chick]) res.status(400).json({ message: "缺少資料" });
  data = {
    time: body.time || new Date().toString(),
    humidity: body.humidity,
    mosquitos: body.mosquitos,
    temperature: body.temperature,
    location: {
      location: {
        longitude: 0,
        latitude: 0,
      },
      area: {
        county: info.ctyName,
        town: info.townName,
        village: info.villageName,
      },
    },
  };
  db.Mosquitos.collection(userInfo._id.toString()).insertOne(data);
  try {
    res.json(data);
  } catch {
    res.send();
  }
}

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
          try {
            info.mosquitos = +info.mosquitos;
          } catch {}
          let area = info.location.area;
          let county = (data[area.county] ||= {});
          let town = (county[area.town] ||= {});
          let village = (town[area.village] ||= []);
          village.push(info);
        })
      )
    );
    res.json(data);
  })
  .get("/nowData/:token/:ip/:mosquitos", async (req, res) => {
    nowData(
      req,
      res,
      {
        ...req.params,
        humidity: 10,
        temperature: 30,
      } as unknown as dataMosquitos & { ip: string },
      req.params?.token as string
    );
  })
  .post("/nowData", async (req, res) =>
    nowData(
      req,
      res,
      req.body as dataMosquitos & { ip: string },
      req.headers["authorization"] as string
    )
  )
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
