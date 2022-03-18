/* /api */
import express from "express";
import axios from "axios";

import config from "../../config";
import v1 from "./v1";

const router = express.Router();

router
  .get("/pls", async (req, res) => {
    if (!req.query.url) return res.status(400).end();
    axios({
      url: `https://od.cdc.gov.tw/${req.query.url}` as string,
      method: "GET",
    })
      .then((d) => {
        for (let [key, value] of Object.entries(d.headers))
          res.setHeader(key, value);
        res.status(d.status || 200).json(d.data);
      })
      .catch((error) => {
        res
          .status((error.response && error.response.status) || 500)
          .json({ error: error });
      });
  })
  .get("/", (_req, res) => {
    res.status(200).json({
      __APIversion__: config.apiV,
      __version__: config.version,
    });
  })
  .get("/gateway", (_req, res) => res.json({ url: "" }))
  .use("/v1", v1);

export default router;
