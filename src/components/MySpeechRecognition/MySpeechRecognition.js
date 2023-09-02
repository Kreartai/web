import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { MyContext } from "@/pages/_app";
import { getLimit, setLimit } from "@/utils/limit";
import { startRecord, stopRecord } from "@/utils/recording";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import generateMidjourneyImage from "@/utils/generateMidjourneyImage";
import checkMidjourneyImage from "@/utils/checkMidjourneyImage";
function MySpeechRecognition() {
  const {
    prompt,
    setPrompt,
    setGeneratedImage,
    setProgressData,
    inprogress,
    setInprogress,
  } = useContext(MyContext);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [model, setModel] = useState("");
  const [audio, setAudio] = useState();

  const setPromptHandler = (text) => {
    if (true) {
      setPrompt(text);
    }
  };

  const RecognitionResult = (event) => {
    let texts = [];
    for (let i = 0; i < event.results.length; i++) {
      texts.push(event.results[i][0].transcript);
    }
    setPromptHandler(texts.join(" "));
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in global) {
      let rec = new webkitSpeechRecognition();
      rec.continuous = true;
      rec.lang = "en-US";
      rec.onresult = RecognitionResult;
      setRecognition(rec);
    }
  }, []);

  const startListening = () => {
    setPrompt("");
    recognition.stop();
    recognition.start();
    // startRecord()
    console.log(recognition);
    setIsListening(true);
  };

  const stopListening = async () => {
    setIsListening(false);
    recognition.stop();

    // let recordedAudio = await stopRecord()

    // const formData = new FormData()
    // formData.append('file', recordedAudio)
    // const t = await fetch('/api/transcription', {
    //   method: 'POST',
    //   body: formData
    // })
    // const transcript = await t.json()
    // await setPrompt(transcript.text)
    // return {audio: recordedAudio, transcript}
    // return {audio: recordedAudio}
  };

  const generateImage = async () => {
    let listening = await stopListening();
    setGeneratedImage({});
    setInprogress(true);
    // setPrompt('')
    setNegativePrompt("");

    // const data = {
    //   sample: 4, prompt,
    //   negativePrompt:"",
    //   model: "midjourney",
    //   dimension: {
    //     width: 520,
    //     height: 520
    //   },
    // }

    const formData = new FormData();
    formData.append("sample", 4);
    formData.append("prompt", prompt);

    // formData.append('file', listening.audio)

    // formData.append('negativePrompt', '')
    // formData.append('width', 520)
    // formData.append('height', 520)

    // API Call
    generateMidjourneyImage(formData, prompt).then((res) => {
      setInprogress(true);
      setTimeout(() => {
        console.log("20 second done");
        let myInterval = setInterval(() => {
          console.log("interval");

          checkMidjourneyImage({ msgId: res.messageId })
            .then((checkRes) => {
              console.log(checkRes, "checkres");
              if (checkRes.progress == 100) {
                clearInterval(myInterval);
                setGeneratedImage({ output: checkRes.images });
                setProgressData({});
              } else if (checkRes.progress > 0) {
                setInprogress(false);
                setProgressData(checkRes);
              }
            })
            .catch((err) => {
              clearInterval(myInterval);
            });
        }, 5000);
      }, 10000);

      if (getLimit()) {
        setLimit(Number(getLimit()) + 1);
      } else {
        setLimit(1);
      }
    });

    // Stable  Diffusion
    //   fetch('/api/generate-image', {
    //     method: 'POST',
    //     body: formData
    //   })
    //   .then(res=>res.json())
    //   .then(result=>{
    //     const {id, meta, output} = result
    //     console.log(id, meta, output);
    // if(output){
    //   setGeneratedImage({ output})

    //   if(getLimit()){
    //     setLimit(Number(getLimit())+1)
    //   }else{
    //     setLimit(1)
    //   }
    // }else{
    //   toast('Something wrong! Try again.')
    // }
    // setInprogress(false)
    //   })
    //   .catch(err=>{
    //     setInprogress(false)
    //     toast('Something wrong! Try again later.')
    //   })
  };
  return (
    <>
      <div className="px-10 text-white ">
        <div className=" flex justify-center  items-center  gap-10">
          <button disabled={isListening} onClick={startListening}>
            <MdKeyboardVoice
              type="button"
              title="Say Something"
              className="hover:text-purple-200 cursor-pointer text-5xl text-white "
            />
          </button>
          <FaStop
            title="Stop Recording"
            onClick={stopListening}
            className="cursor-pointer text-4xl hover:text-red-500 text-red-400"
          />
        </div>
        <h3 className="text-md text-center mb-5  mt-8">
          {isListening ? "Listening..." : "Tap mic to say something"}
        </h3>
        <div className="flex items-center justify-between"></div>
        <div>
          <textarea
            className="text-white bg-black outline-none  rounded-md p-2 w-full h-52"
            placeholder="Prompt.."
            maxLength={600}
            value={prompt}
            onChange={(e) => setPromptHandler(e.target.value)}
          />
        </div>
      </div>
      <div className="mx-10 mt-3 flex justify-between">
        {inprogress ? (
          <button
            className="text-white bg-purple-500 px-3 py-1 rounded-3xl"
            onClick={() => window.location.reload()}
          >
            Stop Generate
          </button>
        ) : (
          <button
            className="text-white bg-purple-500 px-3 py-1 rounded-3xl"
            onClick={generateImage}
          >
            Generate
          </button>
        )}
        <p>{prompt?.length}/600</p>
      </div>
    </>
  );
}

export default MySpeechRecognition;
