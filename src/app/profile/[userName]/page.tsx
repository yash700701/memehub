"use client"

import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useSession, signOut } from 'next-auth/react'
import profile from '@/icons/profile.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation';


type CommentType = {
  userId: string;
  userName: string | undefined;
  postId: string;
  text: string;
  createdAt: Date;
};

type PostType = {
  _id: string;
  url?: string;
  title: string;
  postType: string;
  likeCount: number;
  commentCount: number;
  comments?: CommentType[];
  userName: string;
  userId: string | undefined;
  date: Date;
  isLiked: boolean;
};

function Page() {
  const params = useParams<{ userName: string }>();
  const userName = params.userName;

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userIdFromSession: string | undefined = session?.user?._id;
  const userNameFromSession: string | undefined = session?.user?.userName;

  const router = useRouter();

    useEffect(() => {
      router.prefetch("/");
    }, []);
  
    useEffect(() => {
      router.prefetch("/coins");
    }, []);

     useEffect(() => {
      router.prefetch("/search");
    }, []);
  
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/signin" });
  };

  const message = async () => {
    // you can implement messaging later
  };

  const fetchPosts = async () => {
    try {
      console.log(userIdFromSession, userName);
      
      const res = await axios.post("/api/getPicturesForProfilePage", { userIdFromSession, userName });
      setPosts(res.data.fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await axios.delete(`/api/deletePost`, { data: { postId } });
      setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [userIdFromSession]);

  return (
    <div className="bg-zinc-950  min-h-screen w-full text-white">
    <div className="max-w-4xl mx-auto py-8 px-2 flex flex-col gap-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6 bg-zinc-800 p-6 rounded-2xl shadow-lg">
        <Image
          src={profile}
          alt="Profile"
          unoptimized
          className="w-24 h-24 rounded-full object-cover border-2 border-zinc-600"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">@{userName}</h1>
          {userNameFromSession === userName ? (
            <Button 
              onClick={handleLogout} 
              className="w-32 text-red-500 font-semibold"
            >
              Logout
            </Button>
          ) : (
            <Button 
              onClick={message} 
              className="w-32 bg-blue-200 hover:bg-blue-300 text-blue-500 font-semibold"
            >
              Message
            </Button>
          )}
        </div>
      </div>
  
      {/* Posts */}
      <div className="flex-1 overflow-y-scroll">
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {posts.length === 0 ? (
              <p className="col-span-full text-center text-gray-400">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div 
                  key={post._id} 
                  className="group bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700 hover:scale-[1.02] transition-transform duration-300"
                >
                  
                   {post.postType == "image" ? (
                      <Image
                      src={post.url ? post.url : "/placeholder.png"}  // Fallback image
                      width={10}
                      height={10}
                      alt="ans"  
                      unoptimized
                      className="w-full border-[1px] border-zinc-950  object-cover rounded-xl"
                    />
                  ) : (
                    <video
                    src={post.url ? post.url : "/placeholder.png"} // Replace this with your video URL
                    controls muted loop playsInline
                    autoPlay
                    className="w-full pt-5 rounded-lg shadow-md"
                    />
                  )}
                 
                  <div className="p-4 flex flex-col gap-2">
                    <p className="text-lg font-semibold truncate">{post.title}</p>
                    <div className="text-sm text-gray-400 flex justify-between items-center">
                      <span>❤️ {post.likeCount}</span>
                      <span>💬 {post.commentCount}</span>
                    </div>
                    {userNameFromSession === post.userName && (
                      <Button
                        onClick={() => handleDeletePost(post._id)}
                        className="mt-2 w-full text-red-500 font-medium rounded-lg"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  </div>
  
  );
}

export default Page;
