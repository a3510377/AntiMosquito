/* /postImg */
import { server } from "@/main/server";
import cv from "opencv.js";
import express from "express";
import multer from "multer";
import { createCanvas, Image } from "canvas";
import { main } from "../../../utils/opencv";
import { userType } from "@/models/user";

let gImg: { [id: string]: { data: string; type: string } } = {};
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

router
  .post("/", upload.single("myfile"), (req, res) => {
    const encode_image = req.file.buffer.toString("base64");
    const img = new Image();
    let id = <string>req.query.id || "test";
    img.onload = () => {
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let src = cv.matFromImageData(
        ctx.getImageData(0, 0, canvas.width, canvas.height)
      );

      let { filterListContours, src: _img } = main(src, {
        size: 100,
        rect: true,
      });

      if (filterListContours.length)
        (<server["db"]>req.app.get("db")).createData({
          userId: id,
          mosquitos: filterListContours.length,
        });

      res.json({ contours: filterListContours.length });
    };
    let basImg = base64Img(req.file.mimetype, encode_image);
    gImg[id] = {
      data: basImg,
      type: req.file.mimetype,
    };
    req.app.emit("addImg", id);
    img.src = base64Img(req.file.mimetype, encode_image);
    // res.json({ originalname: req.file.originalname });
  })
  .get("/", (req, res) => {
    res.send();
  })
  .get("/imgs", (req, res) => {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1500\nevent: ready\ndata:\n\n");
    const getImg = async (id: string, img: typeof gImg[number]) => {
      let user =
        (await (<server["db"]>req.app.get("db")).findUser({ id }).catch()) ||
        {};
      addImg({ img: img.data, user, id });
    };
    const addImg = (data: {
      id: string;
      img: Buffer | string;
      user: (userType & { _id: unknown }) | {};
    }) => {
      res.write("event: addImg\n");
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    req.app.on("addImg", (_id) => {
      let id = _id.toString();
      getImg(id, gImg[id]);
    });
    for (let [id, img] of Object.entries(gImg)) getImg(id, img);
  });

export default router;
