import { connect } from "@/dbConfig/dbConfig";
import Transactions from "@/models/transactionHistoryModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest){
    try {
     
        const reqBody = await req.json()
        const {userIdFromSession} = reqBody;
        const transactions = await Transactions.find({ userId: userIdFromSession })
        .sort({ createdAt: -1 }) // descending order (most recent first)
        .lean();

        
        return NextResponse.json({
            mesage: "comments fetched succsessfully", 
            status: true,
            transactions
        })
        
    } catch (error: unknown) {
        // Use `unknown` and narrow it to `Error` where necessary
        if (error instanceof Error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
      }
}