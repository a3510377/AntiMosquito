let src = cv.imread("canvasInput");
let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);
cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
cv.threshold(src, src, 177, 200, cv.THRESH_BINARY);
let contours = new cv.MatVector();
let hierarchy = new cv.Mat();
cv.findContours(
  src,
  contours,
  hierarchy,
  cv.RETR_CCOMP,
  cv.CHAIN_APPROX_SIMPLE
);
let cnt = contours.get(0);
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
cv.imshow("canvasOutput", dst);
src.delete();
dst.delete();
contours.delete();
hierarchy.delete();
cnt.delete();
