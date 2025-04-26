import React from 'react'
import Image from "next/image";
import logo from '@/images/Frame 2.png'
import profile from '@/icons/profile.png'
import coin from '@/icons/coin.png'


import { useSession } from 'next-auth/react';
import Link from 'next/link';

function Header() {

    const { data: session } = useSession();
    // const userIdFromSession: string | undefined = session?.user?._id;
    const userName: string | undefined = session?.user?.userName;

  return (
    <header className="w-full fixed z-10 top-0 p-2">
        <div className={`h-14 transition ease-in-out w-full bg-zinc-950  justify-between items-center flex shadow-lg border-[1px] border-zinc-400 shadow-black rounded-xl`}>
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
        {/* <Link href={`/profile/${userName}`}>
        <Image
        src={profile}
        alt="logo"
        className="w-9 h-9 mx-5"
        />
        </Link> */}
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