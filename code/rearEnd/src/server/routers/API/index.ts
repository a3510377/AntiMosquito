/* /api */
import express from "express";
import config from "@/config";
import mainError from "./main";
import v1 from "./v1";

const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).json({
      __APIversion__: config.apiV,
      __version__: config.version,
    });
  })
  .use("/v1", v1)
  .use(mainError({ notFound: "awa2" }));

export default router;
