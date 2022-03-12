import cv from "opencv.js";
import { createCanvas } from "canvas";

let canvas = createCanvas(200, 200);
let ctx = canvas.getContext("2d");

let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
