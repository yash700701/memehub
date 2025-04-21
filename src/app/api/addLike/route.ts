import {connect} from '@/dbConfig/dbConfig'
import Likes from '@/models/likesModel'
import Posts from '@/models/postModel';
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {userId, postId} = reqBody

        const alreadyLiked = await Likes.findOne({userId, postId})
        if(alreadyLiked){
            return NextResponse.json({
                success: false,
                message: "already liked",
            })
        }

        const newLike = new Likes({
            userId, postId
        })

        const savedLike = await newLike.save()

        await Posts.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

        return NextResponse.json({
            success: true,
            message: "like added and updated in post",
            savedLike
        })


    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}