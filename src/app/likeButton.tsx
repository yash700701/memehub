"use client";

import axios from "axios";
import { useState } from "react";
import like from '@/icons/love (1).png'
import unlike from '@/icons/love.png'
import Image from "next/image";

interface Props {
  postId: string;
  userId: string;
  initialLiked: boolean;
}

export default function LikeButton({ postId, userId, initialLiked }: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [updating, setUpdating] = useState(false);

  const handleLike = async () => {
    setUpdating(true);
    try {
      const res = await axios.post("/api/addLike", { userId, postId });
      if (res.data.success) {
        setLiked(res.data.liked);
      }
    } catch (err) {
      console.error("Error liking post:", err);
    } finally {
      setUpdating(false)
    }
  };

  return (
    <button onClick={handleLike} disabled={updating} className="flex items-center space-x-1">
     {liked? (
      <Image
      src={like}
      height={1}
      width={1}
      alt="like" 
      className="h-6 w-6"
      unoptimized
      />
     ) : (
      <Image
     src={unlike}
     height={1}
     width={1}
     alt="like" 
     className="h-6 w-6"
     unoptimized
     />
     )}
    </button>
  );
}
