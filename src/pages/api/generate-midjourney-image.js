import { STABLEDIFFUSION_KEY } from "@/configs";
import cloudinaryConnect from "@/libs/cloudiniary";
import dbConnect from "@/libs/dbConnect";
import HistoryModel from "@/models/HistoryModel";
import { v2 as cloudinary } from "cloudinary";
const fs = require("fs");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
import { createRouter, expressWrapper } from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

const upload = multer({ storage: multer.memoryStorage() });

router.use(upload.single("file")).post(async (req, res) => {
  const {  prompt} = req.body;
  console.log(prompt, 'prompt');
  const _id = req.cookies._id;

  generate(prompt)
    .then( (result) => {
      res.json(result)
    })
    .catch((err) => {
      console.log(err);
    });
    
});




const generate = (prompt) => {
  
  return new Promise(async(resolve, reject) => {
    const response = await axios.post("https://api.thenextleg.io/v2/imagine",{
      "msg": prompt || "Generate a random image",
      "ref": "",
      "webhookOverride": ""
    }, {
      headers:  {
        Authorization : 'Bearer f1cd0d27-a07c-4b8b-b08c-a4f3a64e93f7',
        'Content-Type': 'application/json'
      }
    })

  resolve(response.data)
  });
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
