/* /postImg */
import cv from "opencv.js";
import express from "express";
import multer, { diskStorage } from "multer";
import { createCanvas, Image } from "canvas";

const base64Img = (mimetype: string, base64: string) =>
  `data:${mimetype};charset=utf-8;base64,${base64}`;
const fileType = ["image/jpeg", "image/png"];
const upload = multer({
  fileFilter: (req, file, cb) => {
    if (!fileType.includes(file.mimetype) && !req.file) {
      cb(null, false);
      return cb(new Error("Allowed only .png/.jpg"));
    }
    cb(null, true);
  },
  storage: diskStorage({
    filename: (_req, file, cb) =>
      cb(null, `${new Date().getTime()}-${file.originalname}`),
  }),
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

    res.end(canvas.toBuffer());
  };
  img.src = base64Img(req.file.mimetype, encode_image);
  // res.json({ originalname: req.file.originalname });
});

export default router;
