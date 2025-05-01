"use client"

import Link from 'next/link'
import React, { useRef } from 'react'

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
  } from "@imagekit/next";

import {Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import axios from 'axios'
import { useState } from "react";


// ui imports
import Image from "next/image";
// import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import play from '@/icons/play-button.png'
import search from '@/icons/magnifying-glass.png'
import message from '@/icons/chat.png'
import home from '@/icons/home.png'
import add from '@/icons/add (1).png'
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';

function BottomMenu() {

    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [preview, setPreview] = useState<string | null>(null);
    const [title, setTitle] = useState("");

    const { data: session } = useSession();
    const userIdFromSession: string | undefined = session?.user?._id;
    const userNameFromSession: string | undefined = session?.user?.userName;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
    
      // setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview
    };
  
    const authenticator = async () => {
    try {
        // Perform the request to the upload authentication endpoint.
        const response = await fetch("/api/imagekit-auth");
        if (!response.ok) {
            // If the server response is not successful, extract the error text for debugging.
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        // Parse and destructure the response JSON for upload credentials.
        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        // Log the original error for debugging before rethrowing a new error.
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
    };


    const handleUpload = async () => {
  
    // Access the file input element using the ref
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        toast("Please select a file to upload");
        return;
    }

    setLoading(true)
    setSuccessMessage("")

    // Extract the first file from the file input
    const file = fileInput.files[0];
    let actualPostType;
    if (file) {
      const type = file.type;
    
      if (type.startsWith("image/")) {
        actualPostType = "image";
      } else if (type.startsWith("video/")) {
        actualPostType = "video";
    
        // Wait for metadata before proceeding
        const duration = await new Promise<number>((resolve, reject) => {
          const video = document.createElement("video");
          video.preload = "metadata";
    
          video.onloadedmetadata = function () {
            window.URL.revokeObjectURL(video.src);
            resolve(video.duration);
          };
    
          video.onerror = () => reject("Failed to load video metadata");
          video.src = URL.createObjectURL(file);
        });
    
        if (duration > 20) {
          toast("Video duration must be 20 seconds or less");
          setLoading(false);
          return; // Stop further execution
        }
      } else {
        toast("Invalid file type");
        setLoading(false);
        return;
      }
    }
    

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
        authParams = await authenticator();
    } catch (authError) {
        console.error("Failed to authenticate for upload:", authError);
        return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
  
    try {
        const uploadResponse = await upload({
            // Authentication parameters
            expire,
            token,
            signature,
            publicKey,
            file,
            fileName: file.name, // Optionally set a custom file name
            // Progress callback to update upload progress state
            onProgress: (event) => {
                setProgress((event.loaded / event.total) * 100);
            },
            // Abort signal to allow cancellation of the upload if needed.
            abortSignal: abortController.signal,
        });
        console.log("Upload response:", uploadResponse.url);

        const url = uploadResponse.url;

        const response = await axios.post("/api/uploadPost", { title, url, actualPostType, userNameFromSession, userIdFromSession });
        if(response){
          setSuccessMessage("uploaded successfully")
        }else{
          setSuccessMessage("error in uploading")
        }
        console.log("Post response:", response.data);
      
        setTitle("")

    } catch (error) {
        // Handle specific error types provided by the ImageKit SDK.
        if (error instanceof ImageKitAbortError) {
            console.error("Upload aborted:", error.reason);
        } else if (error instanceof ImageKitInvalidRequestError) {
            console.error("Invalid request:", error.message);
        } else if (error instanceof ImageKitUploadNetworkError) {
            console.error("Network error:", error.message);
        } else if (error instanceof ImageKitServerError) {
            console.error("Server error:", error.message);
        } else {
            // Handle any other errors that may occur.
            console.error("Upload error:", error);
        }
    } finally {
      setLoading(false);
    }
    };

  return (
    <div className="h-16 w-full border-black bg-zinc-950 flex md:hidden fixed bottom-0 justify-center gap-8 items-center">
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
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={add}
          alt="ans"
          className="w-10 h-10 mt-1"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
          
          </DialogDescription>
        </DialogHeader>
        <h1>Select image / video <span>{"(<= 20 sec)"}</span> from your device</h1>
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
        <progress value={progress} className='h-1 ' max={100}></progress>
        <DialogFooter>
          <Button className="-mt-2" disabled={loading} onClick={handleUpload}>{loading ? "Posting..." : "Post"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Link href={`/videos`}>
      <Image
        src={play}
        alt="ans"
        className="w-8 h-8 mt-1"
      />
    </Link>

   <Image
      src={message}
      alt="ans"
      className="w-8 h-8 mt-1"
    />


   </div>
  )
}

export default BottomMenu