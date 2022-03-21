/* /postImg */
import express from "express";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, "./uploads/"),
    filename: (req, file, cb) =>
      cb(null, `${new Date().getTime()}-${file.originalname}`),
  }),
});

const router = express.Router();

router.get("/", upload.single("singleFile"), (req, res) => {
  console.log(req.file);
  res.json({
    code: "0000",
    type: "single",
    originalname: req.file.originalname,
  });
});

export default router;
