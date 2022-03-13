const cv = require("opencv.js");
// const cv = require("mirada");
const jpeg = require("jpeg-js");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

loadImage("in_img.jpg").then(async (image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  let src = cv.matFromImageData(
    ctx.getImageData(0, 0, canvas.width, canvas.height)
  );

  let dst = new cv.Mat();
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

  cv.threshold(dst, dst, 0, 200, cv.THRESH_BINARY);
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    dst,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );
  let cnt = contours.get(0);
  console.log(cnt);
  // You can try more different parameters
  let rotatedRect = cv.minAreaRect(cnt);
  let vertices = cv.RotatedRect.points(rotatedRect);
  let contoursColor = new cv.Scalar(255, 255, 255);
  let rectangleColor = new cv.Scalar(255, 0, 0);
  cv.drawContours(dst, contours, 0, contoursColor, 1, 8, hierarchy, 100);
  // draw rotatedRect
  for (let i = 0; i < 4; i++) {
    cv.line(
      dst,
      vertices[i],
      vertices[(i + 1) % 4],
      rectangleColor,
      2,
      cv.LINE_AA,
      0
    );
  }
  cv.cvtColor(dst, dst, cv.COLOR_GRAY2RGBA);

  fs.writeFileSync(
    "out_img.jpg",
    jpeg.encode(
      {
        data: dst.data,
        width: dst.size().width,
        height: dst.size().height,
      },
      50
    ).data
  );
  dst.delete();
  src.delete();
});
