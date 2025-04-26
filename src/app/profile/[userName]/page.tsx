"use client"

import { useParams} from 'next/navigation'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'
import profile from '@/icons/profile.png'
import Image from 'next/image'

import { signOut } from "next-auth/react";


type CommentType = {
  userId: string;
  userName: string | undefined;
  postId: string;
  text: string;
  createdAt: Date;
};

type PostType = {
  _id: string;
  imageUrl?: string;
  title: string;
  likeCount: number;
  commentCount: number;
  comments?: CommentType[];
  userName: string;
  userId: string | undefined;
  date: Date;
  isLiked: boolean;
};

function Page() {
  const params = useParams<{ userName: string }>()
  const userName = params.userName

  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState(true)

  const { data: session } = useSession()
  const userIdFromSession: string | undefined = session?.user?._id
  const userNameFromSession: string | undefined = session?.user?.userName


  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  }

  const message = async () => {
    
  }

  const fetchPosts = async () => {
    try {
      const res = await axios.post("/api/getPicturesForProfilePage", { userIdFromSession, userName })
      console.log(res.data.fetchedPosts);
      
      setPosts(res.data.fetchedPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [userIdFromSession])

  return (
    <div className="bg-zinc-950 h-screen w-full text-white">
  <div className="max-w-3xl h-full bg-zinc-800 mx-auto py-6 px-4 flex flex-col">
    {/* Profile Header */}
    <div className="flex items-center gap-6 mb-6 shrink-0">
      <Image
        src={profile}
        alt="Profile"
        unoptimized
        className="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold">@{userName}</h1>
        {userNameFromSession === userName && (
          <Button onClick={handleLogout} className="mt-2 bg-red-200 hover:bg-red-300 text-red-500">
            Logout
          </Button>
        )}
        {userNameFromSession !== userName && (
          <Button onClick={message} className="mt-2 w-40 ">
            Message
          </Button>
        )}
      </div>
    </div>

    {/* Posts */}
    <div className="overflow-y-auto flex-1">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {posts.length === 0 ? (
            <p className="col-span-full text-gray-400">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id} className="bg-zinc-700 shadow-md rounded-xl overflow-hidden border border-zinc-600">
                {post.imageUrl && (
                  <Image src={post.imageUrl} height={10} width={10} unoptimized alt="Post" className="w-full h-60 object-cover" />
                )}
                <div className="p-4">
                  <p className="font-semibold">{post.title}</p>
                  <div className="text-sm text-gray-400 mt-1">
                    ❤️ {post.likeCount} 💬 {post.commentCount}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  </div>
</div>

  )
}

export default Page
