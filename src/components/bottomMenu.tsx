"use client"

import Link from 'next/link'
import React from 'react'
import PostButton from '@/components/postIcon'

// ui imports
import Image from "next/image";
// import { toast } from "sonner"

// import play from '@/icons/play-button.png'
import search from '@/icons/magnifying-glass.png'
import message from '@/icons/chat.png'
import home from '@/icons/home.png'


function BottomMenu() {

  return (
    <div className="h-16 w-full border-black bg-zinc-950 flex md:hidden fixed bottom-0 justify-center gap-10 items-center">
    <Link href={`/`}>
      <Image
        src={home}
        alt="ans"
        className="w-8 h-8 mt-1"
      />
    </Link>

    <Link href={`/search`}>
      <Image
        src={search}
        alt="ans"
        className="w-8 h-8 mt-1"
      />
    </Link>

    {/* picture upload */}
    <div>
    <PostButton/>
    </div>

    {/* <Link href={`/videos`}>
      <Image
        src={play}
        alt="ans"
        className="w-8 h-8 mt-1"
      />
    </Link> */}

   <Image
      src={message}
      alt="ans"
      className="w-8 h-8 mt-1"
    />


   </div>
  )
}

export default BottomMenu