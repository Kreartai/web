import { createRouter, expressWrapper } from "next-connect";
const axios = require("axios");
const multer = require("multer");
const fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");
const {Readable} = require('stream')
let streamifier = require("streamifier");
export const config = {
  api: {
    bodyParser: false,
  },
};
const router = createRouter();
const upload = multer({ storage: multer.memoryStorage() })





router.use(upload.single("file"))
.post(async (req, res)=> {
  const  audioFile  = req.file;
  const formData = new FormData();
  const blob = new Blob([audioFile.buffer], { type: 'audio/mpeg' });
  formData.append('file', blob, 'openai.mp3');
  formData.append('model', 'whisper-1');

  fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: 'POST',
    headers: {
      'Authorization': process.env.OPENAI_API_KEY,
    },
    body: formData,
  })
    .then(response => response.json())
    .then(result=>{
      res.send(result)
    })
})

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
