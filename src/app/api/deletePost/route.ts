import { connect } from "@/dbConfig/dbConfig";
import Posts from "@/models/postModel";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  await connect();
  try {
    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json({ success: false, message: "Post ID is required" }, { status: 400 });
    }

    const deletedPost = await Posts.findByIdAndDelete(postId);

    if (!deletedPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Error deleting post" }, { status: 500 });
  }
}
