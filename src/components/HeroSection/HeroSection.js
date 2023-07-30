import Image from "next/image"
import React from 'react'
import Sample1Img from "@/assets/sample1.png"
import SpeakerImg from "@/assets/speaker.png"
import VoiceGif from "@/assets/voice.gif"
import Link from "next/link"
function HeroSection() {
  return (
    <div className=" text-white sm:flex justify-center items-center gap-10 ">
     <div className="sm:w-[45%] p-10">
      <h1 className=" text-3xl sm:text-4xl md:text-5px lg:text-6xl font-semibold leading-tight">
          Say <br/>
          Something<br/>
          Creative<br/>
          Everyday
        </h1>
        <p className="mt-5 text-md md:text-xl font-light">
          Convert voice into an image in mere sounds with the Kreart.ai Image generator. Say a detailed description and watch your words transform into a vibrant piece of art
        </p>
        <div className="mt-7">
          <Link href="/generate">
          <button className="bg-purple-500 px-7  py-2 rounded-3xl font-semibold">Start the Journey</button>
          </Link>
        </div>
     </div>
     <div className=" w-[90%] m-auto sm:w-[45%]  px-5 mt-14">
      <div className="flex  gap-5  items-center mb-4">
      <Image  src={SpeakerImg} height={50} width={50} />
      <p className="text-md sm:text-2xl mb-5 italic mt-2 ">Black king standing under rainbow</p>
      </div>
      <Image className="w-full sm:w-[80%]" src={Sample1Img} height={500} width={500} />
      <Image src={VoiceGif} className="w-full sm:w-[80%]" />
     </div>
    </div>
  )
}

export default HeroSection