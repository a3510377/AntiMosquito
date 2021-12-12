import express from "express";
import API from "./API";

const router = express.Router();

router.use("/api", API);

export default router;
