import cv from "opencv.js";

export const main = (
  src: cv.Mat,
  config?: {
    max?: [number, number, number];
    min?: [number, number, number];
    size?: number;
    rect?: boolean;
  }
): { src?: cv.Mat; filterListContoursLength: number } => {
  config = {
    max: [40, 40, 40],
    min: [10, 10, 10],
    size: 100,
    rect: false,
    ...config,
  };
  let retData: { [k: string]: unknown } = {};
  let mask = new cv.Mat();
  let mask1 = new cv.Mat();
  let hierarchy = new cv.Mat();
  let contours = new cv.MatVector();
  let THRESH_MIN = 120;

  let minMat = new cv.Mat(src.rows, src.cols, src.type(), [...config.min, 0]);
  let maxMat = new cv.Mat(src.rows, src.cols, src.type(), [...config.max, 255]);

  cv.inRange(src, minMat, maxMat, mask1);

  cv.threshold(mask1, mask, THRESH_MIN, 255, cv.THRESH_BINARY);
  cv.findContours(
    mask,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  let listContours: cv.Mat[] = [];
  for (let k = 0; k < +contours.size(); k++) listContours.push(contours.get(k));

  let filterListContours: cv.Mat[] = listContours.filter(
    (cnt) => !(cv.moments(cnt, false).m00 <= config.size)
  );

  if (config.rect) {
    listContours.forEach((cnt) => {
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
    });
    retData.src = src.clone();
  }
  let filterListContoursLength = filterListContours.length;
  src.delete();
  mask.delete();
  mask1.delete();
  minMat.delete();
  maxMat.delete();
  contours.delete();
  hierarchy.delete();
  listContours.forEach((_) => _.delete());
  return { ...retData, filterListContoursLength };
};
