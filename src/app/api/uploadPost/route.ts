import { connect } from "@/dbConfig/dbConfig";
import Posts from '@/models/postModel'
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request: NextRequest){
    try { 
        const reqBody = await request.json()
        const { title, url, actualPostType, userNameFromSession, userIdFromSession} = reqBody
        
        // create new post
        const newPost = new Posts({
            title,
            url,
            postType: actualPostType,
            userName: userNameFromSession,
            userId: userIdFromSession
        })
         
        const savedPost = await newPost.save()
        
        return NextResponse.json({
            mesage: "reporrt created succsessfully", 
            status: true,
            savedPost
        })
        
    } catch (error: unknown) {
        // Use `unknown` and narrow it to `Error` where necessary
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
      }
}