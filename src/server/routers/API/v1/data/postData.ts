import express from "express";
import dbType from "@/db";
import { dataMosquitos } from "@/types/db.data";

const router = express.Router();

router
  .get("/data", async (req, res) => {
    let db = req.app.get("db") as dbType;
    let data = [];
    (await db.Mosquitos.collections()).forEach((db) => data.push(db.find()));
    res.json(data);
  })
  .post("/postData", async (req, res) => {
    let body = req.body as { data: dataMosquitos[] };
    let ip = req.query.ip as string;
    let authorization = req.headers["authorization"] as string;

    if (!ip || !Array.isArray(body))
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
          query: { ip: "ip: string" },
        },
        code: 0,
      });
    else if (!authorization)
      return res.status(401).json({ message: "token error or token error" });

    let db = req.app.get("db") as dbType;
    /* TODO: 添加type */
    let userInfo = (await db.checkToken(authorization)) as any;
    let data: dataMosquitos[] = [];
    body.forEach((value) => {
      if (
        value?.Time &&
        value?.Humidity &&
        value?.Mosquitos &&
        value?.Temperature
      )
        try {
          data.push({
            Time: value.Time,
            Humidity: +value.Humidity,
            Mosquitos: +value.Mosquitos,
            Temperature: +value.Temperature,
          });
        } catch {
          return res.status(400).json({
            messages: "data error",
            code: 0,
          });
        }
      else return res.status(400).json({});
    });

    db.Mosquitos.collection(`${userInfo._id}`).insertMany(data);
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
