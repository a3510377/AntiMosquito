import express from "express";
import dbType from "@/db";
import { dataMosquitos, dbDataMosquitos } from "@/types/db.data";
import { getIp, getVillage } from "@/utils/axios";

const router = express.Router();

router
  .get("/data", async (req, res) => {
    let db = req.app.get("db") as dbType;
    let data = [];
    (await db.Mosquitos.collections()).forEach((db) => data.push(db.find()));
    res.json(data);
  })
  .post("/postData", async (req, res) => {
    let body = req.body as { [IP: string]: dataMosquitos[] };
    let authorization = req.headers["authorization"] as string;

    if (body.constructor === Object)
      return res.status(400).json({
        messages: "參數錯誤",
        parametric: {
          data: {
            Time: "時間: string | number",
            Humidity: "濕度: number",
            Mosquitos: "蚊子數量: number",
            Temperature: "溫度: number",
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
    Object.entries(body).forEach(async ([_ip, value], index) => {
      let ipData = await getIp("ip");
      value.forEach(async (_key) => {
        if (ipData === false) return;
        let info = await getVillage(ipData.longitude, ipData.latitude);
        data.push({
          time: "",
          humidity: 0,
          mosquitos: 0,
          temperature: 0,
          location: {
            location: {
              longitude: ipData.longitude,
              latitude: ipData.latitude,
            },
            area: { county: "", town: "", village: "" },
          },
        });
      });
      // try {
      //   data.push({
      //     time: value.time,
      //     humidity: +value.humidity,
      //     mosquitos: +value.mosquitos,
      //     temperature: +value.temperature,
      //     location: {
      //       location: {
      //         latitude: 0, // 緯度
      //         longitude: 0, // 經度
      //       },
      //       area: {
      //         county: "", // 縣
      //         area: "", // 區
      //         village: "", // 里
      //       },
      //     },
      //   });
      // } catch {
      //   return res.status(400).json({
      //     messages: "data error",
      //     code: 0,
      //   });
      // }
      return res.status(400).json({});
    });

    db.Mosquitos.collection(userInfo._id.toString()).insertMany(data);
    res.json(data);
  });

export default router;

// let t = async () => {
//   let ip = "1.2.3.4";

//   console.log(
//     await fetch(
//       `/api/v1/check?ip=${ip}&token=${
//         (
//           await fetch("/api/v1/setup?ip=" + ip)
//         ).body
//       }`
//     )
//   );
// };
