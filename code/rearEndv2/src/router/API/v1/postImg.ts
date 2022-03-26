/* /postImg */
import { server } from "@/main/server";
import cv from "opencv.js";
import express from "express";
import multer, { diskStorage } from "multer";
import { createCanvas, Image } from "canvas";
import { main } from "../../../utils/opencv";

const base64Img = (mimetype: string, base64: string) =>
  `data:${mimetype};charset=utf-8;base64,${base64}`;
const fileType = ["image/jpeg", "image/png"];
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!fileType.includes(file.mimetype) && !req.file) {
      cb(null, false);
      return console.log("data type error");
    }
    cb(null, true);
  },
});

const router = express.Router();

router.post("/", upload.single("myfile"), (req, res) => {
  const encode_image = req.file.buffer.toString("base64");
  const img = new Image();
  img.onload = () => {
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    let src = cv.matFromImageData(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );

    let { filterListContours } = main(src, { size: 100 });

    if (filterListContours.length)
      (<server["db"]>req.app.get("db")).createData({
        mosquitos: filterListContours.length,
      });

    res.json({ contours: filterListContours.length });
  };
  img.src = base64Img(req.file.mimetype, encode_image);
  // res.json({ originalname: req.file.originalname });
});

export default router;
