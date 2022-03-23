let mask = new cv.Mat();
let mask1 = new cv.Mat();
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();

const config = {
  max: [255, 255, 255],
  min: [0, 0, 0],
};

let cnt;
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
// 輪廓
/* for (let i = 0; i < contours.size(); i++) {
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
}
 */
let M00Array = [0];
for (let k = 0; k < contours.size(); k++) {
  cnt = contours.get(k);
  Moments = cv.moments(cnt, false);
  M00Array[k] = Moments.m00;
}
function MaxAreaArg(arr) {
  if (arr.length == 0) return -1;

  let max = arr[0];
  let maxIndex = 0;
  let dupIndexCount = 0;

  if (arr[0] >= 0.9 * aarea) max = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max && arr[i] < 0.99 * aarea) {
      maxIndex = i;
      max = arr[i];
      dupIndexCount = 0;
    } else if (arr[i] == max && arr[i] != 0) dupIndexCount++;
  }

  return dupIndexCount === 0 ? maxIndex : -2;
}
let ArgMaxArea = MaxAreaArg(M00Array);
if (ArgMaxArea >= 0) {
  let cnt = contours.get(MaxAreaArg(M00Array)); //use the contour with biggest MOO
  let Moments = cv.moments(cnt, false);
  M00 = Moments.m00;
  M10 = Moments.m10;
  M01 = Moments.m01;
  let x_cm = M10 / M00;
  let y_cm = M01 / M00;

  let rect = cv.boundingRect(cnt);
  let point1 = new cv.Point(rect.x, rect.y);
  let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);

  cv.rectangle(src, point1, point2, [0, 0, 255, 255], 2, cv.LINE_AA, 0);

  let point3 = new cv.Point(x_cm, y_cm);
  cv.circle(src, point3, 2, [0, 0, 255, 255], 2, cv.LINE_AA, 0);
}
