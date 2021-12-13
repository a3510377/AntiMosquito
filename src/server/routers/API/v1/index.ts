/* /v1 */
import express from "express";
import create from "./user/create";
// import mainError from "../main";
import postData from "./data/postData";

const router = express.Router();

router
  .get("/", (req, res) => res.status(200).json({ v: 1 }))
  .use(create)
  .use(postData);
// .use(mainError({ notFound: "awa" }));

export default router;
