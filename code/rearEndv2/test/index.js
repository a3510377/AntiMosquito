const cv = require("opencv.js");
const jpeg = require("jpeg-js");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

loadImage("in_img.jpg").then((image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  let src = cv.matFromImageData(
    ctx.getImageData(0, 0, canvas.width, canvas.height)
  );

  let dst = new cv.Mat();
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

  let low = new cv.Mat(dst.rows, dst.cols, dst.type(), [0, 0, 0, 0]);
  let high = new cv.Mat(dst.rows, dst.cols, dst.type(), [150, 150, 150, 255]);

  cv.inRange(dst, low, high, dst);

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
