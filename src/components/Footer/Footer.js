import Link from "next/link"
import React from 'react'

function Footer() {
  return (
    <div className="bg-white text-slate-600 px-5 sm:px-20 py-10">
      <h3 className="text-2xl font-bold mb-5">
        Get the latest update
      </h3>
      <div className="flex justify-between gap-3 flex-wrap">
        <Link className="text-lg underline" href="#getintouch">get in touch</Link>
        <Link className="text-lg " href="#about">About Us</Link>
        <Link className="text-lg " href="#faq">FAQ</Link>
      </div>
    </div>
  )
}

export default Footer