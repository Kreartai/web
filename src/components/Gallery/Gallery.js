import Image from "next/image";
import React from "react";
import SpeakingImg from "@/assets/speaking.png";
import TapImg from "@/assets/tap.png";
import SampleImg from "@/assets/sample1.png";
import DownloadImg from "@/assets/download.png";
import ShareImg from "@/assets/share.png";
import Link from "next/link";
function Gallery() {
  return (
    <>
    <div
      id="gallery"
      className="  flex justify-center sm:items-center text-white min-h-screen "
    >
      <div className="mx-5 mt-20 sm:mt-0">
        <h1 className=" text-3xl sm:text-6xl break-words font-bold text-center">
          How to Generate your Images
        </h1>
        <div className="flex gap-20 sm:gap-10 justify-center mt-10 sm:mt-20 flex-wrap">
          <div className=" w-[300px] h-[300px]">
            <Image className="w-full h-full" src={SpeakingImg} />
            <h3 className="text-xl sm:text-2xl text-center sm:mt-5 font-light">
              RECORD YOUR VOICE
            </h3>
          </div>
          <div className=" w-[300px] h-[300px]">
            <Image className="w-full h-full" src={TapImg} />
            <h3 className="text-xl sm:text-2xl text-center sm:mt-5 font-light break-words">
              CHOOSE THE IMAGE THAT FITS YOUR VISION
            </h3>
          </div>
          <div className=" w-[300px] h-[300px] mt-10 sm:mt-0">
            <Image className=" w-full h-[270px]" src={SampleImg} />
            <div className="flex h-[30px] mt-2 justify-between">
              <Image className="w-8" src={DownloadImg} />
              <Image className="w-8" src={ShareImg} />
            </div>
            <h3 className="text-xl sm:text-2xl text-center sm:mt-5 font-light">
              SHARE YOUR DESIGN
            </h3>
          </div>
        </div>
        
      </div>
      
    </div>
    <div className="mt-7 text-white flex justify-center">
    <Link href="/generate">
      <button className="bg-purple-500 px-7  py-2 rounded-3xl font-semibold">
        Start the Journey
      </button>
    </Link>
  </div>
  </>
  );
}

export default Gallery;
