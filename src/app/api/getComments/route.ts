import { connect } from "@/dbConfig/dbConfig";
import Comments from "@/models/commentModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest){
    try {
     
        const reqBody = await req.json()
        const {id} = reqBody;
        const fetchedComments = await Comments.find({postId: id}).lean()
        
        return NextResponse.json({
            mesage: "comments fetched succsessfully", 
            status: true,
            fetchedComments
        })
        
    } catch (error: unknown) {
        // Use `unknown` and narrow it to `Error` where necessary
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
      }
}