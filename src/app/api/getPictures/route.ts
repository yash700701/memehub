
import { connect } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import Likes from "@/models/likesModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    // get userId from query param or session
    const reqBody = await req.json();
    const {userIdFromSession, postType} = reqBody;

    if (!userIdFromSession) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const fetchedPosts = await Posts.find({postType: postType}).sort({date: -1}).lean();
    const likedPosts = await Likes.find({ userId: userIdFromSession }).lean();

    const likedPostIds = likedPosts.map((like) => like.postId.toString());

    const postsWithLike = fetchedPosts.map((post) => ({
      ...post,
      _id: post._id?.toString(),
      isLiked: likedPostIds.includes(post._id?.toString() || "")
    }));

    return NextResponse.json({
      status: true,
      message: "Posts fetched successfully",
      postsWithLike,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
