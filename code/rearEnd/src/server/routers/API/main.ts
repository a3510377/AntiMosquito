import express from "express";

const router = express.Router();

export default (options?: { [key: string]: any }) =>
  router.all("*", (req, res) => {
    res.status(404).json({
      message: options?.notFound || "404: Not Found",
      code: 0,
    });
  });
