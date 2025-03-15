import React from 'react'
import Image from "next/image";
import logo from '@/images/Frame 2.png'

function header() {
  return (
    <header className="w-full fixed top-0 h-20 p-3">
            <div className="h-14 w-full bg-zinc-950 items-center flex shadow-lg border-[1px] border-zinc-400 shadow-black rounded-full">
            {/* <Image
            src={logo}
            alt="logo"
            className="w-56 h-10 mx-5"
            /> */}
            </div>
        </header>
  )
}

export default header