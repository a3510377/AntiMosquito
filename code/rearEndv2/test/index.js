const cv = require("opencv4nodejs");
// const cv = require("mirada");
const jpeg = require("jpeg-js");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const config = {
  max: { R: 50, G: 50, B: 50 },
  min: { R: 0, G: 0, B: 0 },
};
const THRESH_MIN = 120;

const MaxAreaArg = (area, arr) => {
  if (arr.length == 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;
  var dupIndexCount = 0; //duplicate max elements?

  if (arr[0] >= 0.9 * area) {
    max = 0;
  }

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max && arr[i] < 0.99 * area) {
      maxIndex = i;
      max = arr[i];
      dupIndexCount = 0;
    } else if (arr[i] == max && arr[i] != 0) {
      dupIndexCount++;
    }
  }

  if (dupIndexCount == 0) {
    return maxIndex;
  } else {
    return -2;
  }
};

loadImage("in_img.jpg").then(async (image) => {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  let src = cv.matFromImageData(
    ctx.getImageData(0, 0, canvas.width, canvas.height)
  );

  let dst = new cv.Mat();
  cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);

  let high = new cv.Mat(dst.rows, dst.cols, dst.type(), [
    config.max.R,
    config.max.G,
    config.max.B,
    255,
  ]);
  let low = new cv.Mat(dst.rows, dst.cols, dst.type(), [
    config.min.R,
    config.min.G,
    config.min.B,
    0,
  ]);

  cv.inRange(dst, low, high, dst);
  // cv.threshold(dst, dst, THRESH_MIN, 255, cv.THRESH_BINARY);

  (() => {
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();

    cv.findContours(
      dst,
      contours,
      hierarchy,
      cv.RETR_CCOMP,
      cv.CHAIN_APPROX_SIMPLE
    );

    //
    let cnt;
    let Moments;
    let M00;
    let M10;
    let M00Array = [];

    //ANN:13
    for (let k = 0; k < contours.size(); k++) {
      cnt = contours.get(k);
      Moments = cv.moments(cnt, false);
      M00Array[k] = Moments.m00;
    }

    let ArgMaxArea = MaxAreaArg(dst.rows + dst.cols, M00Array);
    console.log(ArgMaxArea);
    if (ArgMaxArea >= 0) {
      cnt = contours.get(ArgMaxArea); //use the contour with biggest MOO
      console.log(cnt);
      Moments = cv.moments(cnt, false);
      M00 = Moments.m00;
      M10 = Moments.m10;
      M01 = Moments.m01;
      x_cm = M10 / M00; // 75 for circle_9.jpg
      y_cm = M01 / M00; // 41 for circle_9.jpg

      //***************bounding rect***************************
      let rect = cv.boundingRect(cnt);
      let point1 = new cv.Point(rect.x, rect.y);
      let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);

      cv.rectangle(dst, point1, point2, [0, 0, 255, 255], 2, cv.LINE_AA, 0);
      //*************end bounding rect***************************

      //*************draw center point*********************
      let point3 = new cv.Point(x_cm, y_cm);
      cv.circle(dst, point3, 2, [0, 0, 255, 255], 2, cv.LINE_AA, 0);
      //***********end draw center point*********************
    }
    cnt.delete();
  })();

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
