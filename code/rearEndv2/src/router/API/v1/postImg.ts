/* /postImg */
import jpeg from "jpeg-js";
import cv from "opencv.js";
import express from "express";
import multer from "multer";
import { createCanvas, Image } from "canvas";

import { server } from "@/main/server";
import { main } from "../../../utils/opencv";
import { userType } from "@/models/user";

let gImg: {
  [id: string]: {
    img: string;
    type: string;
    fImg: string;
    data: { contours: number };
  };
} = {};
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
    const encode_image = req.file?.buffer.toString("base64");
    if (!encode_image) return res.status(400).end();
    const img = new Image();
    const server = <server>(<unknown>req.app.get("main"));

    let id = <string>req.query.id || "test";
    let basImg = base64Img(req.file.mimetype, encode_image);
    img.onload = () => {
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      let { filterListContoursLength, src: _img } = main(
        cv.matFromImageData(
          ctx.getImageData(0, 0, canvas.width, canvas.height)
        ),
        { size: 100, rect: true }
      );

      if (filterListContoursLength) {
        server.db.createData({
          userId: id,
          mosquitos: filterListContoursLength,
        });
      }

      res.json({ contours: filterListContoursLength });

      clearTimeout(server.data.postImg[id]);
      server.data.postImg[id] = setTimeout(() => {
        delete gImg[id];
        req.app.emit("deleteImg", id);
      }, 1e3 * 60 * 5);
      gImg[id] = {
        img: basImg,
        type: req.file.mimetype,
        fImg: base64Img(
          "image/jpeg",
          jpeg
            .encode(
              {
                data: _img.data,
                width: _img.size().width,
                height: _img.size().height,
              },
              50
            )
            ?.data?.toString("base64")
        ),
        data: { contours: filterListContoursLength },
      };
      req.app.emit("addImg", id);
      _img.delete();
    };

    img.src = basImg;
    server.db.model.UserModel.findOneAndUpdate(
      { id },
      { id },
      { upsert: true, new: true }
    ).catch();
    // res.json({ originalname: req.file.originalname });
  })
  .get("/imgs", (req, res) => {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write("retry: 1500\nevent: ready\ndata:\n\n");
    const server = <server>(<unknown>req.app.get("main"));
    const getImg = async (id: string, img: typeof gImg[string]) => {
      let user = (await server.db.findUser({ id }).catch()) || {};
      addImg({ ...img, user, id });
    };
    const addImg = (data: {
      id: string;
      img?: Buffer | string;
      fImg?: string;
      data: typeof gImg[string]["data"];
      user: (userType & { _id: unknown }) | {};
    }) => {
      res.write("event: addImg\n");
      res.write(`data: ${JSON.stringify(data || "{}")}\n\n`);
    };

    req.app
      .on("addImg", (_id) => {
        let id = _id.toString();
        getImg(id, gImg[id]);
      })
      .on("deleteImg", (_id) => {
        res.write("event: deleteImg\n");
        res.write(`data: ${_id.toString()}\n\n`);
      });

    for (let [id, img] of Object.entries(gImg)) getImg(id, img);
  });

export default router;
