/* /v1 */
import express from "express";
import create from "./create";
import mainError from "../main";

const router = express.Router();

router.get("/", (req, res) => res.status(200).json({ v: 1 })).use(create);
// .use(mainError({ notFound: "awa" }));

export default router;
