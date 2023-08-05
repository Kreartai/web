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
let streamifier = require("streamifier");
require("dotenv").config();
import { createRouter, expressWrapper } from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();
const upload2 = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, "" + Math.random() * new Date().getTime());
    },
  }),
});

const upload = multer({ storage: multer.memoryStorage() });
router.use(upload.single("file")).post(async (req, res) => {
  const { sample, dimension, prompt, negativePrompt, model } = req.body;
  console.log(prompt, 'prompt');
  const _id = req.cookies._id;

  generate({ sample, dimension, prompt, negativePrompt, model })
    .then(async (result) => {
      const uploads = result.output.map((img, i) =>
        uploadImage(img, `${i} - ${prompt?.slice(0, 20)} - ${uuid()}`)
      );
      // const audio = await uploadAudio(prompt, req.file.buffer);

      Promise.all(uploads)
        .then(async (values) => {
          const newHistory = new HistoryModel({
            prompt,
            images: values,
            // audio: audio?.secure_url,
            author: _id,
          });

          await dbConnect();
          newHistory
            .save()
            .then((his) => {
              res.json(result);
              console.log("history saved");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
       
    })
    .catch((err) => {
      console.log(err);
    });
    
});

// Upload Image
const uploadImage = async (image, text) => {
  await cloudinaryConnect();
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      image,
      { folder: "image", public_id: text },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        return resolve(result?.secure_url);
      }
    );
  });
};

// const uploadAudio = async (prompt, buffer) => {
//   const shortPrompt = prompt.slice(0, 20);
//   return new Promise(async (resolve, reject) => {
//     await cloudinaryConnect();
//     // cloudinary.uploader.upload(
//     //   fPath,
//     //   {
//     //     folder: "audio",
//     //     public_id: `${shortPrompt.replace(" ", "-")} - ${filename}`,
//     //     resource_type: "video",
//     //     transformation: [{ audio_codec: "mp3", bit_rate: "128k" }],
//     //   },
//     //   (err, result) => {
//     //     if (result) {
//     //       resolve(result);
//     //       console.log(result);
//     //       console.log("uploaded");
//     //       fs.unlinkSync(fPath);
//     //     }
//     //     if (err) {
//     //       console.log(err);
//     //     }
//     //   }
//     // );
//     const cld_upload_stream = cloudinary.uploader.upload_stream(
//       {
//         folder: "audio",
//         public_id: `${shortPrompt.replace(" ", "-")}-${
//           Math.random() * new Date().getTime()
//         }`,
//         resource_type: "video",
//         transformation: [{ audio_codec: "mp3", bit_rate: "128k" }],
//       },
//       (err, result) => {
//         if (result) {
//           resolve(result);
//           // console.log(result)
//           console.log("uploaded");
//         }
//         if (err) {
//           console.log(err);
//         }
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(cld_upload_stream);
//   });
// };



const generate = ({ sample, dimension, prompt, negativePrompt, model }) => {
  const defaultNegative = negativePrompt
    ? negativePrompt
    : "naked, porn, nudity, sex, adult, boobs, pussy, nude,  skimpy clothes, sexy, sexualized, hot, boob, breast";

  let imageConfig = {
    key: STABLEDIFFUSION_KEY,
    prompt: prompt,
    negative_prompt: defaultNegative,
    samples: sample,
    num_inference_steps: "20",
    safety_checker: "no",
    enhance_prompt: "yes",
    seed: null,
    guidance_scale: 7.5,
    multi_lingual: "no",
    panorama: "no",
    self_attention: "no",
    upscale: "no",
    embeddings_model: "embeddings_model_id",
    webhook: null,
    track_id: null,
  };
  let apiUrl = "https://stablediffusionapi.com/api/v3/text2img";

  if (model) {
    imageConfig = {
      key: STABLEDIFFUSION_KEY,
      model_id: model,
      prompt: prompt,
      negative_prompt: defaultNegative,
      samples: sample,
      num_inference_steps: "30",
      safety_checker: "no",
      enhance_prompt: "yes",
      seed: null,
      guidance_scale: 7.5,
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      lora_model: null,
      tomesd: "yes",
      clip_skip: "2",
      use_karras_sigmas: "yes",
      vae: null,
      lora_strength: null,
      scheduler: "UniPCMultistepScheduler",
      webhook: null,
      track_id: null,
    };
    apiUrl = "https://stablediffusionapi.com/api/v4/dreambooth";
  }
  if (dimension) {
    imageConfig.width = dimension.width;
    imageConfig.height = dimension.height;
  }
  console.log(imageConfig);
  return new Promise((resolve, reject) => {
    axios
      .post(apiUrl, imageConfig)
      .then((res) => {
        console.log("api called");
        if (res.data.status == "success") {
          console.log("success 1");
          resolve(res.data);
        } else if (res.data.status == "processing") {
          console.log("processing", res.data.id);
          const interval = setInterval(() => {
            axios
              .post("https://stablediffusionapi.com/api/v4/dreambooth/fetch", {
                key: STABLEDIFFUSION_KEY,
                request_id: res.data.id,
              })
              .then((result) => {
                if (result.data.status == "success") {
                  console.log("success 2");
                  resolve(result.data);
                  clearInterval(interval);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }, 1000);
        } else {
          console.log(res);
          reject(res);
        }
      })
      .catch((err) => {
        console.log(err, "image generate error");
        reject(err);
      });
  });
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
