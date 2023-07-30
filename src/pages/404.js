import React from 'react'
import CommingImg from "@/assets/comming.gif"
import Image from "next/image"
import Link from "next/link"
function notfound() {
  return (
    <div>
    <div className="text-white flex justify-center mt-28 ">
      <Image src={CommingImg} className="w-[50%]" />
    </div>
    <div className="text-white flex justify-center  mt-10">
     <Link href="/generate">
       <button className="bg-purple-500 px-7  py-2 rounded-3xl font-semibold">Start the Journey</button>
       </Link>
     </div>
    </div>
  )
}

export default notfound