import Image from "next/image"
import React from 'react'
import VoiceImg from "@/assets/red-voice.png"
import Link from "next/link"
function Beta() {
  return (
    <>
    <div className="text-white px-10 text-center pt-28 pb-10 flex justify-center items-center">
      <div>
      <h1 className="text-3xl sm:text-6xl font-bold ">Try our Beta Version</h1>
      <p className="text-2xl mt-7 font-light">See how AI can turn your voice into art.</p>
      <div className="flex justify-center mt-10">
        <Image className="w-[300px]" src={VoiceImg} />
      </div>
      </div>
    </div>
    <div className=" mb-20 text-white flex justify-center">
    <Link href="/generate">
      <button className="bg-purple-500 px-7  py-2 rounded-3xl font-semibold">
        Start the Journey
      </button>
    </Link>
  </div>
    </>
  )
}

export default Beta