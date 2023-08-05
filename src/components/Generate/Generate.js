import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MySpeechRecognition from "../MySpeechRecognition/MySpeechRecognition";
import { MyContext } from "@/pages/_app";
import withAuth from "@/HOCS/withAuth";
import { getLimit, setLimit } from "@/utils/limit";
import { useRouter } from "next/router"
import {BiArrowBack} from 'react-icons/bi'
import AudioRecorder from "../AudioRecorder/AudioRecorder";


function Generate() {
  const router = useRouter()
  return (
    <div className="  md:max-w-[1000px] m-auto ">
      {/* <button className="mb-10 bg-purple-500 px-3 rounded-3xl" onClick={()=>router.back()}>
        <BiArrowBack className="text-2xl font-bold text-purple-500" />
        Back
      </button> */}
    <MySpeechRecognition />
    {/* <AudioRecorder /> */}
    </div>
  );
}

export default withAuth(Generate);

