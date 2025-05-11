import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PostButton from '@/components/postIcon'

import bookmarkl from '@/icons/bookmarkL.png'
import profile from '@/icons/profile.png'
import search from '@/icons/magnifying-glass.png'
import more from '@/icons/application.png'
import message from '@/icons/chat.png'
import home from '@/icons/home.png'

function SideBar() {
  return (
    <div className="w-96 hidden md:flex h-screen bg-zinc-900 border-zinc-800 overflow-y-scroll">
    <div className="w-full h-3/4 bg-zinc-900 p-5 flex flex-col justify-center mt-28">
        <Link href={'/'} className="bg-zinc-900 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={home}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Home</h1>
        </Link>
        <Link href={'search'} className="bg-zinc-900 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={search}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Search</h1>
        </Link>

        <PostButton/>
        
        <Link href={'/'} className="bg-zinc-900 my-2 py-5  shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={message}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Messages</h1>
        </Link>
       
        {/* <Link href={'/'} className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={play}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Meme Snaps</h1>
        </Link> */}

         
        

        <Link href={'/'} className="bg-zinc-900 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={bookmarkl}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Saved</h1>
        </Link>
        <Link href={'/'} className="bg-zinc-900 my-2 py-5  shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={profile}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">Profile</h1>
        </Link>
        <Link href={'/'} className="bg-zinc-900 my-8 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
        <Image
           src={more}
           alt="ans"
           className="w-6 h-6"
         />
         <h1 className="text-zinc-200">More</h1>
        </Link>
        
    </div>
</div>
  )
}

export default SideBar