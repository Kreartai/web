import cloudinaryConnect from "@/libs/cloudiniary";
import { v2 as cloudinary } from "cloudinary";
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

export default uploadImage