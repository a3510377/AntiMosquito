/* /v1 */
import express from "express";

const router = express.Router();

router.get("/", (_req, res) => res.status(200).json({ v: 1 }));

export default router;
