"use client"

import Image from "next/image";
import Header from "@/components/header";



import c from '@/images/3633f067-5fcf-4363-8821-f11da79cd71b.jpeg'
import d from '@/images/3a2dccc3-773c-4631-b4c6-3c9598b762c1.jpeg'
import e from '@/images/3cb7c303-cbcd-49cc-908c-e38c4d621bb8.jpeg'
import f from '@/images/5ac1010f-4409-464d-adfc-5ed05acdf8bd.jpeg'
import g from '@/images/61ff5955-c92c-4d90-b72a-77d84d4e301f.jpeg'
import h from '@/images/7b455f15-e4f2-4eb2-9384-da574222a9d6.jpeg'
import i from '@/images/80072546-5caa-4cb7-ba78-d9dd8f3a85f2.jpeg'
import j from '@/images/8e5b4693-839d-4553-818e-e638788361ca.jpeg'
import k from '@/images/9012e7a2-5131-45c0-a597-16b2e88205e4.jpeg'
import l from '@/images/9902511d-4941-4a59-b1c6-cce4f6c7fd57.jpeg'
import m from '@/images/a8555251-f018-4b04-8ae9-3ffe3933b30a.jpeg'
import n from '@/images/ace614a5-12d4-4161-9664-3a2cc3e9d60b.jpeg'
import o from '@/images/b762529c-8d5e-4d1f-be92-da80ffbc06f4.jpeg'
import p from '@/images/e5a8cde4-48d7-4ebd-894d-2aaa0d93b3c1.jpeg'

import unlike from '@/icons/heart (1).png'
import play from '@/icons/play.png'
import like from '@/icons/heart.png'
import comment from '@/icons/comment.png'
import bookmark from '@/icons/bookmark.png'
import bookmarkl from '@/icons/bookmarkL.png'
import profile from '@/icons/bussiness-man.png'
import search from '@/icons/search-interface-symbol.png'
import more from '@/icons/application.png'
import message from '@/icons/message.png'
import home from '@/icons/home.png'
import add from '@/icons/add.png'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
 
import send from '@/icons/send.png'
import { useState } from "react";





export default function HomePage() {


  const [isHovered, setIsHovered] = useState(false);
   
  const images = [c,d,e,f,g,h,i,j,k,l,m,n,o,p]
  const [liked, setLiked] = useState(false)
  const handleLike = ()=>{
    setLiked((prev)=>!prev)
  }
  return (
   <div>
   <Header/>

   {/* sidebar */}
   <div className="w-full flex h-screen bg-zinc-100">
       <div className="w-96 hidden md:flex h-screen border-zinc-100">
           <div className="w-full h-3/4 bg-zinc-100 p-5 flex flex-col justify-center border-r-[1px] border-zinc-500 mt-28">
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={home}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Home</h1>
               </Button>
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={search}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Search</h1>
               </Button>
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={message}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Messages</h1>
               </Button>
              
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={play}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Meme Snaps</h1>
               </Button>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
                    <Image
                      src={add}
                      alt="ans"
                      className="w-6 h-6"
                    />
                    <h1 className="text-zinc-800">Post</h1>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator /> */}
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Photo</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuItem>Meme Snap</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={bookmarkl}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Saved</h1>
               </Button>
               <Button className="bg-zinc-100 my-2 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={profile}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">Profile</h1>
               </Button>
               <Button className="bg-zinc-100 my-8 py-4 hover:bg-zinc-200 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={more}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-800">More</h1>
               </Button>
               
           </div>
       </div>

       <div className="w-full h-screen bg-zinc-100 scroll-smooth overflow-y-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 bg-zinc-100 py-32 px-2  gap-4">
          {images.map((img, index)=>(
              <div key={index} className="mb-4 border-b-[1px] border-zinc-500 break-inside-avoid">
                  <Image
                  src={img}
                  alt="ans"
                  className="w-full border-[1px] border-zinc-950 object-cover rounded-lg"
                  />
                  <div className="h-full w-10 bg-orange-500">
                  
                  </div>
                  <div className="w-full py-2 h-12 flex justify-between">
                    <div className="flex gap-4 items-center">
                    <button onClick={handleLike}>
                    <Image
                    src={liked ? like : unlike}
                    alt="ans"
                    className="w-8 h-8"
                    />
                    </button>
                    <h1 className="text-zinc-900 text-xl">56</h1>
                    <Image
                    src={comment}
                    alt="ans"
                    className="w-8 h-8"
                    />
                    <h1 className="text-zinc-900 text-xl">4</h1>
                    <Image
                    src={send}
                    alt="ans"
                    className="w-8 h-8"
                    />
                    </div>
                    <div>
                    <Image
                    src={bookmark}
                    alt="ans"
                    className="w-8 h-8"
                    />
                    </div>
                  </div>
              </div>
            ))}
            </div>

       </div>
   </div>
   
   {/* bottom menu */}
   <div className="h-14 w-full bg-white flex md:hidden fixed bottom-0">
   
   </div>

   </div>

  );
}
