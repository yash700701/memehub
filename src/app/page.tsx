"use client"

import axios from 'axios'
import Header from "@/components/header";
import { useEffect, useState } from "react";


// ui imports

import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image";
import { Toaster } from "@/components/ui/sonner"
// import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import LikeButton from '@/app/likeButton';


import {Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import * as React from "react"
 
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

 
// icons


import play from '@/icons/play-button.png'
import comment from '@/icons/chat (1).png'
import bookmark from '@/icons/bookmark.png'
import bookmarkl from '@/icons/bookmarkL.png'
import profile from '@/icons/profile.png'
import search from '@/icons/magnifying-glass.png'
import more from '@/icons/application.png'
import message from '@/icons/chat.png'
import home from '@/icons/home.png'
import add from '@/icons/add (1).png'
import send from '@/icons/send.png'
import download from '@/icons/downloading.png'

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function HomePage() {
  
  const [posts, setPosts] = useState<PostType[]>([]);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [postingComment, setPostingComment] = useState<boolean[]>([]);
  const [commentText, setCommentText] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);

  const { data: session } = useSession();
  const userIdFromSession: string | undefined = session?.user?._id;
  const userNameFromSession: string | undefined = session?.user?.userName;

  
  // type declaration

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
    likeCount: number;
    commentCount: number;    
    comments?: CommentType[];
    userName: string,
    userId: string | undefined,
    date: Date,
    isLiked: boolean,
  };

  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  useEffect(() => {
    router.prefetch("/videos");
  }, []);

  useEffect(()=>{
    fetchPosts()
  },[userIdFromSession])

  const fetchPosts = async()=>{
    console.log(userIdFromSession);
    
    try {
      const res = await axios.post("/api/getPictures", {userIdFromSession, postType: "image"})
      console.log(res.data.postsWithLike);
      setPosts(res.data.postsWithLike)
      setVisible(true)
    } catch (error) {
      console.log(error);
    }
  }


  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedComments = [...commentText];
    updatedComments[index] = e.target.value;
    setCommentText(updatedComments);
    console.log(commentText);
  };

  const addComment = async (index: number, postId: string) => {
    try {

      const updatedPosting = [...postingComment];
      updatedPosting[index] = true;
      setPostingComment(updatedPosting);

      // Save comment to the database
      console.log(commentText[index]);
      console.log(postId);
      console.log(userIdFromSession);
      console.log(userNameFromSession);
      
      await axios.post("/api/addComment", {
        comment: commentText[index], 
        postId: postId,
        userId: userIdFromSession,
        userName: userNameFromSession,
      });
  
      // Update the comments in the UI
      const updatedPosts = [...posts];
      updatedPosts[index].comments?.push({ text: commentText[index], userId: "", userName: userNameFromSession, postId: "", createdAt: new Date() });
      updatedPosts[index].commentCount += 1;
      setPosts(updatedPosts);
  
      // Clear the comment after adding
      const updatedComments = [...commentText];
      updatedComments[index] = ""; 
      setCommentText(updatedComments);
  
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      const updatedPosting = [...postingComment];
      updatedPosting[index] = false;
      setPostingComment(updatedPosting);
    }
  };

  const loadComments = async (id: string)=>{
      try {
        const res = await axios.post("/api/getComments", {id})
        console.log(res.data.fetchedComments);
        
        setComments(res.data.fetchedComments);
        
      } catch (error) {
        console.log(error);
        
      }
  }

  function timeAgo(date: Date | string) {
    const past = new Date(date).getTime();
    const now = new Date().getTime(); // Always local time (JS handles the UTC offset correctly)
  
    const diff = (now - past) / 1000; // in seconds
  
    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);
    const months = Math.floor(diff / (30 * 86400));
    const years = Math.floor(diff / (365 * 86400));
  
    if (diff < 60) return "just now";
    if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  return (
  <div className=''>
  <Header/>
  <Toaster  position="top-center" richColors />
  <div className="w-full flex h-screen bg-zinc-800">

    {/* sidebar */}
    <div className="w-96 hidden md:flex h-screen border-zinc-800 overflow-y-scroll">
           <div className="w-full h-3/4 bg-zinc-800 p-5 flex flex-col justify-center mt-28">
               <Button className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={home}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Home</h1>
               </Button>
               <Button className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={search}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Search</h1>
               </Button>
               <Button className="bg-zinc-800 my-2 py-5  shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={message}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Messages</h1>
               </Button>
              
               <Button className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={play}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Meme Snaps</h1>
               </Button>
  
                <Popover>
                      <PopoverTrigger asChild>
                      <Button className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
                      <Image
                        src={add}
                        alt="ans"
                        className="w-6 h-6"
                      />
                      <h1 className="text-zinc-200">Post</h1>
                      </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-40">
                      <Dialog>
                      <DialogTrigger asChild>
                      <h1 className="mb-2 cursor-pointer border-b-[1px] pb-2">Picture</h1>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Create New Post</DialogTitle>
                          <DialogDescription>
                            {/* Make changes to your profile here. Click save when you're done. */}
                          </DialogDescription>
                        </DialogHeader>
                        {/* <h1>Select image from your device</h1>
                        <input
                          type="file"
                          name="file"
                          ref={fileInputRef}
                          accept="image/*, video/*"
                          onChange={handleFileChange}
                          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white focus:outline-none"
                        
                        />
                        <div className="w-32 h-32 rounded-lg bg-slate-50 ">
                        {preview && 
                        <Image 
                        src={preview} 
                        alt="Preview" 
                        className="w-32  h-32 object-cover rounded-lg" 
                        width={80}
                        height={80}
                        unoptimized
                        />}
                        </div>
                        <Input 
                        type="text"
                        value={title}
                        placeholder="Title ( *optional )"
                        onChange={(e)=> setTitle(e.target.value)}
                        />
                        <div className={`'w-full h-8  text-center ${successMessage == "uploaded successfully" ? "text-green-500" : "text-red-500"}`}>
                        {successMessage}
                        </div>
                        <progress value={progress} max={100}></progress> */}
                        <DialogFooter>
                          {/* <Button className="-mt-2" disabled={loading} onClick={handleUpload}>{loading ? "Posting..." : "Post"}</Button> */}
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                      <div className=''>Video</div>
                      </PopoverContent>
                    </Popover>
               <Button className="bg-zinc-800 my-2 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={bookmarkl}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Saved</h1>
               </Button>
               <Button className="bg-zinc-800 my-2 py-5  shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={profile}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">Profile</h1>
               </Button>
               <Button className="bg-zinc-800 my-8 py-5 shadow-none hover:border-[1px] border-zinc-500 w-60 flex justify-start">
               <Image
                  src={more}
                  alt="ans"
                  className="w-6 h-6"
                />
                <h1 className="text-zinc-200">More</h1>
               </Button>
               
           </div>
    </div>

    {/* posts */}
    <div className="w-full h-screen bg-zinc-950 scroll-smooth overflow-y-auto">
         {visible ? 
         (<div>
             <div className="columns-1 sm:columns-2 lg:columns-3 bg-zinc-950 py-24 px-2  gap-4">
            {posts.map((post: PostType, index)=>(
              <div key={index} className="mb-4 pb-5 border-b-[1px] border-zinc-700 break-inside-avoid">

                  <div className='relative'>
                    <Image
                      src={post.url ? post.url : "/placeholder.png"}  // Fallback image
                      width={10}
                      height={10}
                      alt="ans"  
                      unoptimized
                      className="w-full border-[1px] border-zinc-950  object-cover rounded-xl"
                    />
                   <div className='absolute bottom-0 h-12 flex justify-between items-center rounded-b-xl w-full bg-[rgba(9,9,11,0.6)]'>
                   <div className='flex'>
                    <Image
                        src={profile}
                        width={10}
                        height={10}
                        alt="ans"
                        unoptimized
                        className="w-8 h-8 ml-2 border-zinc-950 object-cover rounded-xl"
                      />
                      <h1 className='text-white ml-2'>|</h1>
                      <Link href={`/profile/${post.userName}`} className='ml-2 underline text-lg text-white'>{post.userName}</Link>
                   </div>
                   <div className='text-zinc-200 mr-2'>
                      {timeAgo(post.date)}
                   </div>


                  </div>
                  </div>

                  {/* like, comment, share and bookmarl */}
                  <div className="w-full py-2 h-12 flex justify-between">
                    <div className="flex gap-4 items-center">

                    {session?.user?._id && (
                      <LikeButton
                        postId={post._id}
                        userId={session.user._id}
                        initialLiked={post.isLiked}
                      />
                    )}

                    <h1 className=" text-zinc-200 ">{post?.likeCount}</h1>

                    {/* dialog - click on comment */}

                    <div className='sm:flex hidden'>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button onClick={()=>loadComments(post._id)}  className='cursor-pointer'>
                          <Image
                          src={comment}
                          alt="ans"
                          className="w-8 h-8"
                          />
                        </button>
                      </DialogTrigger>
                      <DialogContent className="bg-white h-[70vh] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] ">
                    
                        <DialogTitle></DialogTitle>
                  
                        <div className=" grid md:grid-cols-2 overflow-y-scroll md:overflow-hidden">
                          <div>
                          <Image
                            src={post.url ? post.url : "/placeholder.png"}  // Fallback image
                            width={10}
                            height={10}
                            alt="ans"  
                            unoptimized
                            className="w-full  border-[1px] border-zinc-950 object-cover "
                          />
                          </div>
                          <div className=''>
                          <h1 className='bg-white pb-5 text-xl md:pl-5 border-b-[1px] border-zinc-500'>account info</h1>
                          <div className='h-[40vh] overflow-y-scroll w-full '>
                          {comments.map((comment, index)=>(
                            <div className='text-xl border-b-[1px] py-1 md:pl-5' key={index}>
                            {comment.text}
                            </div>
                          ))}
                          </div>
                          </div>
                        </div>
                        <DialogFooter>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    </div>

                    {/* drawer - click on comment */}

                    <div className='flex sm:hidden'>
                      <Drawer>
                        <DrawerTrigger asChild>
                        <button onClick={()=>loadComments(post._id)} className='cursor-pointer'>
                          <Image
                          src={comment}
                          alt="ans"
                          className="w-6 h-6"
                          />
                        </button>
                        </DrawerTrigger>
                        <DrawerContent className=''>
                          <div className="mx-auto px-5 pb-5 h-screen w-full max-w-sm overflow-y-scroll">
                          <DrawerHeader>
                            <DrawerTitle></DrawerTitle>
                            <DrawerDescription></DrawerDescription>
                          </DrawerHeader>
                          <Image
                            src={post.url ? post.url : "/placeholder.png"}  // Fallback image
                            width={10}
                            height={10}
                            alt="ans"  
                            unoptimized
                            className="w-full border-[1px] border-zinc-950 object-cover rounded-lg"
                          />
                          <h1 className='text-xl font-semibold mt-5 '>Comments:</h1>
                          {comments.map((comment, index)=>(
                            <div className='text-xl border-b-[1px] py-1' key={index}>
                            {comment.text}
                            </div>
                          ))}
                          </div>
                        </DrawerContent>
                      </Drawer>
                    </div>

                    <h1 className="text-zinc-200 ">{post.commentCount}</h1>
                    <Image
                    src={send}
                    alt="ans"
                    className="w-6 h-6"
                    />
                    </div>
                    <div className='flex gap-5'>
                    <Image
                    src={download}
                    alt="ans"
                    className="w-6 h-6"
                    />
                    <Image
                    src={bookmark}
                    alt="ans"
                    className="w-6 h-6"
                    />
                    </div>
                  </div>
                  
                  <div className="w-full text-zinc-200 text-lg pt-1">
                  {post.title.length > 0 ? (
                    <div>
                      {post.userName} : <span className='text-[#B27525]'>{post.title}</span>
                    </div>
                  ) : ("")}
                  </div>

                  <div className=''>

                    {/* three latest comments and view all comments button */}
                    <div className=' text-lg text-zinc-200 justify-between'>
                    Comments:{" - "}
                      <h1>
        
                      <span>
                        {post.comments && post.comments.length > 0 ? (
                          <>
                            {post.comments[post.comments.length - 1].userName} :{" "}
                            {post.comments[post.comments.length - 1].text}
                          </>
                        ) : (
                          "No comments yet"
                        )}
                      </span>

                        {post.comments && post.comments.length > 1 ? (
                          <p className=''>
                          {post.comments[post.comments.length - 2].userName} : {" "}
                          {post.comments[post.comments.length - 2].text}
                        </p>
                        ): (<></>)}

                        {post.comments && post.comments.length > 2 ? (
                          <p className=''>
                          {post.comments[post.comments.length - 3].userName} : {" "}
                          {post.comments[post.comments.length - 3].text}
                        </p>
                        ): (<></>)}

                      </h1>
                    </div>

                  </div>

                  {/* add new comment */}
                  <div className='flex justify-between mt-2'>
                    <input
                        className='border-b-[1px] text-zinc-200 placeholder-zinc-200 mr-2 py-1 w-full mt-1'
                        type='text'
                        value={commentText[index] || ""}
                        onChange={(e) => handleCommentChange(e, index)}
                        placeholder='Add a comment'
                    />
                    <button 
                      onClick={() => addComment(index, post._id)}
                      className='pr-2 text-[#B27525]'
                      disabled={!commentText[index]}
                    >
                      {postingComment[index] ? (
                        <Loader2 className='animate-spin'/>
                      ) : ('Post')}
                    </button>
                  </div>

              </div>
            ))}
          </div>
         </div>) : 

        //  Loader 
         (<div className='flex flex-col z-0 items-center gap-10 mt-24'>
           <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] bg-[#dcdcdc] w-[365px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4  bg-[#dcdcdc] w-[250px]" />
                <Skeleton className="h-4  bg-[#dcdcdc] w-[200px]" />
              </div>
            </div>
           <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] bg-[#dcdcdc] w-[365px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4  bg-[#dcdcdc] w-[250px]" />
                <Skeleton className="h-4  bg-[#dcdcdc] w-[200px]" />
              </div>
            </div>
           <div className="flex flex-col space-y-3">
              <Skeleton className="h-[125px] bg-[#dcdcdc] w-[365px] rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4  bg-[#dcdcdc] w-[250px]" />
                <Skeleton className="h-4  bg-[#dcdcdc] w-[200px]" />
              </div>
            </div>
         </div>)}

    </div>

  </div>

   </div>

  );
}
