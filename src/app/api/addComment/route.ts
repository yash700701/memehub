import { connect } from "@/dbConfig/dbConfig";
import Posts from '@/models/postModel';
import Comments from "@/models/commentModel";
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { comment, postId, userId, userName } = reqBody;

        // Validate that userId and comment are provided
        if (!postId || !userId || !comment || !userName) {
            return NextResponse.json({ error: "userId and comment are required" }, { status: 400 });
        }

        // Make sure userId is cast to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const postObjectId = new mongoose.Types.ObjectId(postId);

        // Prepare the comment object with all necessary fields
        const newComment = {
            userId: userObjectId,
            userName: userName,
            postId: postObjectId,
            text: comment,
            createdAt: new Date(),
        };

        // Update the post's comments array, add the new comment, and increment commentCount
        const savedPost = await Posts.findByIdAndUpdate(
            postId,
            {
                $push: {
                    comments: newComment,
                },
                $inc: {
                    commentCount: 1,
                }
            },
            { new: true }
        );

        // If the post is updated, trim the comments to 2 latest
        if (savedPost) {
            // Ensure only 2 latest comments are kept
            savedPost.comments = savedPost.comments.slice(-3);
            await savedPost.save(); // Save the updated post with the trimmed comments
        }
 
        const new_comment = new Comments(newComment);
        new_comment.save();    

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
