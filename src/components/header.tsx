import React from 'react'
import Image from "next/image";
import logo from '@/images/Frame 2.png'
import profile from '@/icons/profile.png'
import coin from '@/icons/coin.png'

function header() {
  return (
    <header className="w-full fixed top-0 h-20 p-3">
        <div className="h-14 w-full bg-zinc-950  justify-between items-center flex shadow-lg border-[1px] border-zinc-400 shadow-black rounded-full">
        <Image
        src={logo}
        alt="logo"
        className="w-36 h-7 mx-5"
        />
        <div className='flex'>
        <Image
        src={coin}
        alt="coin"
        className="w-9 h-9"
        />
        <Image
        src={profile}
        alt="logo"
        className="w-9 h-9 mx-5"
        />
        </div>
        </div>
    </header>
  )
}

export default header