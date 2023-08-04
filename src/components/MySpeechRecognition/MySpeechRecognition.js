import React, { useContext, useEffect, useState } from "react";
import { MdKeyboardVoice } from "react-icons/md";
import { FaStop } from "react-icons/fa";
import { MyContext } from "@/pages/_app";
import { getLimit, setLimit } from "@/utils/limit";
import { startRecord, stopRecord } from "@/utils/recording";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let recognition = {}

function MySpeechRecognition() {
  const {prompt, setPrompt,  setGeneratedImage, inprogress, setInprogress}  = useContext(MyContext)
  const [isListening, setIsListening] = useState(false);
  // const [recognition, setRecognition] = useState({})
  const [negativePrompt, setNegativePrompt] = useState('')
  const [model, setModel] = useState('')
  const [audio, setAudio] = useState()

  const setPromptHandler = (text) => {
    if(true){
      setPrompt(text)
    }
  }
  useEffect(()=>{
    window.navigator.mediaDevices ? window.navigator.mediaDevices.getUserMedia({audio:true})
    .then(res=>{
      console.log(res);
      window.alert(JSON.stringify(res.id))
    })
    :  window.alert("No media device")
  },[])

  const RecognitionResult = (event) => {
    let texts = [];
    for (let i = 0; i < event.results.length; i++) {
      texts.push(event.results[i][0].transcript);
    }
    setPromptHandler(texts.join(" "))
  };
  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  }
  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.onresult = RecognitionResult
  // useEffect(()=>{
   

  // },[])
  

 

  const startListening = () => {
    setPrompt("");
    startRecord()
    if(recognition){
      console.log(recognition);
      recognition.start();
      setIsListening(true);
    }else{
      window.alert("Recognition not supported")
    }
  };
  
  const stopListening = async() => {
    setIsListening(false);
    recognition.stop();
    let recordedAudio = await stopRecord()
    return recordedAudio
  };
  const generateImage = async() =>{
    let recordedAudio = await stopListening()
    setInprogress(true)
    // setPrompt('')
    setNegativePrompt('')
    
    // const data = {
    //   sample: 4, prompt, 
    //   negativePrompt:"",
    //   model: "midjourney",
    //   dimension: {
    //     width: 520,
    //     height: 520
    //   },
    // }

    const formData = new FormData()
    formData.append('sample', 4)
    formData.append('prompt', prompt)
    formData.append('file', recordedAudio)
  
    // formData.append('negativePrompt', '')
    // formData.append('width', 520)
    // formData.append('height', 520)

    // API Call
    fetch('/api/generate-image', {
      method: 'POST',
      body: formData
    })
    .then(res=>res.json())
    .then(result=>{
      const {id, meta, output} = result
      if(output){
        setGeneratedImage({id, meta, output})
        
        if(getLimit()){
          setLimit(Number(getLimit())+1)
        }else{
          setLimit(1)
        }
      }else{
        toast('Something wrong! Try again.')
      }
      setInprogress(false)
    })
    .catch(err=>{
      setInprogress(false)
      toast('Something wrong! Try again later.')
    })
  }
  return (
    <>
    <div className="px-10 text-white ">
      <div className="flex items-center justify-between">
        <h3 className="text-md mb-5  mt-2">
          {isListening ? "Listening..." : "Say Something.."}
        </h3>
        <div className=" flex  items-center  gap-7">
          <button disabled={isListening}  onClick={startListening}>
            <MdKeyboardVoice
              type="button"
              title="Start Listening"
              className="hover:text-purple-200 cursor-pointer text-3xl text-white "
            />
          </button>
          <FaStop
            title="Stop Listening"
            onClick={stopListening}
            className="cursor-pointer text-xl hover:text-red-500 text-red-400"
          />
        </div>
      </div>
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
      {
        inprogress ? <button className="text-white bg-purple-500 px-3 py-1 rounded-3xl" onClick={()=>window.location.reload()}>Stop Generate</button>
        : <button className="text-white bg-purple-500 px-3 py-1 rounded-3xl" onClick={generateImage}>Generate</button>
      }
      <p>{prompt.length}/600</p>
    </div>
    </>
  );
}

export default MySpeechRecognition;



