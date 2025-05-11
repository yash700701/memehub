import React from 'react'
import Image from "next/image";
import profile from '@/icons/profile.png'


import { useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {

    const { data: session } = useSession();
    // const userIdFromSession: string | undefined = session?.user?._id;
    const userName: string | undefined = session?.user?.userName;

  return (
    <header className="w-full fixed z-10 top-0 p-2">
        <div className={`h-14 transition ease-in-out w-full bg-zinc-950  justify-between items-center flex shadow-lg border-[1px] border-zinc-400 shadow-black rounded-xl`}>
        <h1 className='text-zinc-100 text-4xl font-bold ml-4'>Mim<span className='text-[#B27525]'>zy</span></h1>
        <div className='flex'>
        <Link href={'/coins'}>
        {/* <Image
        src={coin}
        alt="coin"
        className="w-9 h-9"
        /> */}
        <h1 className='font-extrabold text-3xl'>🪙</h1>
        </Link>
        <Link href={`/profile/${userName}`}>
        <Image
        src={profile}
        alt="logo"
        className="w-9 h-9 mx-5"
        />
        </Link>
        </div>
        </div>
    </header>
  )
}

export default Header