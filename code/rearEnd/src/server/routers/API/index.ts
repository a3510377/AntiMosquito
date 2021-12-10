import express from "express";
import axios from "axios";
// import { version, description, author } from "../../../package.json";
import { GeolocationAPIData } from "../../../types/axios.data";

const router = express.Router();

router
  .get("/", (req, res) => {})
  // .get("/info", (req, res) => res.json({ version, description, author }))
  .get("/setup", async (req, res) => {
    // url ex: /setup?ip=1.1.1.1
    const ip: string = req.query.ip as string;
    if (
      !/^((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/.test(
        ip
      )
    )
      return res.status(400).send("無 ip 參數");
    let data = (
      await axios({
        url: `https://api.ipgeolocation.io/ipgeo?ip=${res}`,
        method: "GET",
      })
    ).data() as GeolocationAPIData;
    res.send(data);
  });

export default router;
