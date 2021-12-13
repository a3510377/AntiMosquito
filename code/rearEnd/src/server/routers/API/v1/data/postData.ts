import express from "express";
import dbType from "@/db";
import { dataMosquitos } from "@/types/db.data";

const router = express.Router();

router.post("/postData", async (req, res) => {
  let body = req.body as { data: dataMosquitos[] };
  let Authorization = req.headers["Authorization"] as string;

  if (!Authorization || !Array.isArray(body)) return res.status(400).json({});

  let db = req.app.get("db") as dbType;
  /* TODO: 添加type */
  let userInfo = (await db.checkToken(Authorization)) as any;
  let data: dataMosquitos[] = [];
  body.forEach((value) => {
    if (
      value?.Time &&
      value?.humidity &&
      value?.Mosquitos &&
      value?.Temperature
    )
      data.push({
        Time: value.Time,
        humidity: value.humidity,
        Mosquitos: value.Mosquitos,
        Temperature: value.Temperature,
      });
    else return res.status(400).json({});
  });
  console.log(data);
  console.log(userInfo._id, userInfo);

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
