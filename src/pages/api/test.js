import cloudinaryConnect from "@/libs/cloudiniary";
import dbConnect from "@/libs/dbConnect";
import HistoryModel from "@/models/HistoryModel";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
const fs = require("fs");

import multer from "multer";
const path = require("path");
import { createRouter, expressWrapper } from "next-connect";

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

const router = createRouter();
router
.use(upload.single("file"))
.post(async (req, res) => {
  // await cloudinaryConnect();
  // await cloudinary.uploader.upload(
  //   req.file.path,
  //   {
  //     folder: "audio", public_id: req.file.filename,
  //     resource_type: "video",
  //     transformation: [{ audio_codec: "mp3", bit_rate: "128k" }],
  //   },
  //   (err, result) => {
  //     if(result){
  //       console.log('uploaded');
  //       fs.unlinkSync(req.file.path)
  //     }
  //     if (err) {
  //       console.log(err);
  //     }
  //   }
  // );
  

});

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
