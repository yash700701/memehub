import { connect } from "@/dbConfig/dbConfig";
import Posts from '@/models/postModel';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { comment, postId } = reqBody;

        // Update the post's comments array
        const savedPost = await Posts.findByIdAndUpdate(
            postId,
            { $push: { comments: { text: comment, createdAt: new Date() } } },  // Proper syntax to push a comment
            { new: true }  // Return the updated document
        );

        return NextResponse.json({
            message: "Comment added successfully",
            status: true,
            savedPost
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
