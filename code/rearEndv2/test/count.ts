import cv from "opencv.js";
import jpeg from "jpeg-js";
import fs from "fs";
import { createCanvas, loadImage } from "canvas";

const config = {
  max: [40, 40, 40],
  min: [0, 0, 0],
};

loadImage("./in_img.jpg").then(async (image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  let src = cv.matFromImageData(
    ctx.getImageData(0, 0, canvas.width, canvas.height)
  );

  const main = () => {
    let mask = new cv.Mat();
    let mask1 = new cv.Mat();
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    let THRESH_MIN = 120;

    let high = new cv.Mat(src.rows, src.cols, src.type(), [...config.max, 255]);
    let low = new cv.Mat(src.rows, src.cols, src.type(), [...config.min, 0]);

    cv.inRange(src, low, high, mask1);

    cv.threshold(mask1, mask, THRESH_MIN, 255, cv.THRESH_BINARY);
    cv.findContours(
      mask,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    let listContours: cv.Mat[] = [];
    for (let k = 0; k < +contours.size(); k++)
      listContours.push(contours.get(k));
    // 輪廓
    for (let i = 0; i < +contours.size(); i++)
      cv.drawContours(
        src,
        contours,
        i,
        [0, 0, 0, 255],
        2,
        cv.LINE_8,
        hierarchy,
        100
      );

    if (+contours.size() >= 0) {
      const func = (cnt: cv.Mat) => {
        let Moments = cv.moments(cnt, false);
        let M00 = Moments.m00;
        if (M00 < 100) return;
        let rect = cv.boundingRect(cnt);

        cv.rectangle(
          src,
          new cv.Point(rect.x, rect.y),
          new cv.Point(rect.x + rect.width, rect.y + rect.height),
          [0, 0, 255, 255],
          2,
          cv.LINE_AA,
          0
        );

        cv.circle(
          src,
          new cv.Point(Moments.m10 / M00, Moments.m01 / M00),
          2,
          [0, 0, 255, 255],
          2,
          cv.LINE_AA,
          0
        );
      };
      for (let k = 0; k < +contours.size(); k++) func(contours.get(k));
    }
    fs.writeFileSync(
      "out_img.jpg",
      jpeg.encode(
        {
          data: src.data,
          width: src.size().width,
          height: src.size().height,
        },
        50
      ).data
    );
    src.delete();
    mask.delete();
    mask1.delete();
    contours.delete();
    hierarchy.delete();
  };
  main();
});
