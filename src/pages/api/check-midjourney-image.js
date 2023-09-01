import dbConnect from "@/libs/dbConnect";
import HistoryModel from "@/models/HistoryModel";

const axios = require("axios");
export default async function handler(req, res) {
  const r = await axios.get(
    "https://api.thenextleg.io/v2/message/" + req.query.id,
    {
      headers: {
        Authorization: "Bearer 08f61cb9-0abb-4519-be5c-2cef3b431af4",
        "Content-Type": "application/json",
      },
    }
  );

  const _id = req.cookies._id;
  console.log(r.data, 'resp data x');
  if (r.data.progress == 100) {
    const newHistory = new HistoryModel({
      prompt: r.data.response.content,
      images: r.data.response.imageUrls,
      // audio: audio?.secure_url,
      author: _id,
    });
    await dbConnect();
    newHistory
      .save()
      .then((his) => {
        console.log("history saved");
        res.send(r.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }else{
    res.send(r.data)
  }
  // res.status(200).json({ name: 'John Doe' })
}
