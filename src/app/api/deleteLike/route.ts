import {connect} from '@/dbConfig/dbConfig'
import Likes from '@/models/likesModel'
import Posts from '@/models/postModel';
import { NextResponse, NextRequest } from 'next/server'

connect();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();
        const {userId, postId} = reqBody;

        await Likes.deleteOne({
            userId, postId
        })

        await Posts.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

        return Response.json({
            success: true,
            message: "like deleted and updated in post",
        })
    } catch (error: unknown) {
        // Use `unknown` and narrow it to `Error` where necessary
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
          }
          return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}