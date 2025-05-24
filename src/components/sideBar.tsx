import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PostButton from '@/components/postIcon'

import bookmarkl from '@/icons/bookmarkL.png'
import search from '@/icons/magnifying-glass.png'
import more from '@/icons/application.png'
import message from '@/icons/chat.png'
import home from '@/icons/home.png'

function SideBar() {
  return (
    <div className="w-96 hidden md:flex h-screen bg-zinc-900 border-zinc-800 overflow-y-scroll">
    <div className="w-full h-3/4 bg-zinc-900 p-5 gap-3 flex flex-col justify-center mt-28">
        <Link href={'/'} className="bg-zinc-900 rounded-2xl my-2 p-2 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={home}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200 ml-3">Home</h1>
        </Link>
        <Link href={'search'} className="bg-zinc-900 rounded-2xl my-2 p-2 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={search}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200 ml-3">Search</h1>
        </Link>

        <div className='rounded-2xl items-center bg-zinc-900 p-2 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start'>
          <PostButton/>
          <h1 className='text-zinc-200 ml-3'>Create</h1>
        </div>
        
        <Link href={'/'} className="bg-zinc-900 my-2 p-2 rounded-2xl shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={message}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200 ml-3">Messages</h1>
        </Link>
        <Link href={'/'} className="bg-zinc-900 my-2 p-2 rounded-2xl shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={bookmarkl}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200 ml-3">Saved</h1>
        </Link>

        <Link href={'/'} className="bg-zinc-900 my-8 rounded-2xl p-2 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={more}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200 ml-3">More</h1>
        </Link>
        
    </div>
</div>
  )
}

export default SideBar