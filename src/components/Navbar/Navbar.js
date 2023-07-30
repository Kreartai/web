import { MyContext } from "@/pages/_app"
import Link from "next/link"
import React, { useContext, useEffect } from 'react'
import { useCookies } from "react-cookie";
import {BiUserCircle} from 'react-icons/bi'
function Navbar() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie']);
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MyContext)

  return (
    <div className=" z-50 sticky top-0 bg-slate-950 px-5 sm:px-20  py-2 text-white flex flex-wrap items-center gap-2 sm:gap-5 justify-between">
      <div className="">
        <h3 className="text-md sm:text-2xl font-bold italic">Kreart.ai</h3>
      </div>
      <div className="flex  text-xs sm:text-base gap-3 sm:gap-20">
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/gallery">
          <p>Gallery</p>
        </Link>
        <Link href="/explore">
          <p>Explore</p>
        </Link>
      </div>
      {
        isLoggedIn == false &&
        <div className=" ">
          <Link href="/signup">
            <button className="bg-purple-500 px-2 sm:px-5 text-xs sm:text-sm rounded-3xl py-1">Signup</button>
          </Link>
      </div>
      }
      {
        isLoggedIn == true &&
        <div className=" ">
          <Link href="/account">
            <button className=" mt-3">
            <BiUserCircle className="text-3xl" />
            </button>
          </Link>
      </div>
      }
    </div>
  )
}

export default Navbar