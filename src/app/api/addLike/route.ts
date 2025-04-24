
import { connect } from '@/dbConfig/dbConfig';
import Likes from '@/models/likesModel';
import Posts from '@/models/postModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(req: NextRequest) {
  const { userId, postId } = await req.json();

  const alreadyLiked = await Likes.findOne({ userId, postId });

  if (alreadyLiked) {
    await Likes.deleteOne({ userId, postId });
    await Posts.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

    return NextResponse.json({ success: true, liked: false });
  }

  await new Likes({ userId, postId }).save();
  await Posts.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

  return NextResponse.json({ success: true, liked: true });
}
