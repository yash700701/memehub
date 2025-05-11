import { connect } from "@/dbConfig/dbConfig";
import Users from '@/models/userModel';
import Transactions from "@/models/transactionHistoryModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userIdFromSession, amount, description} = reqBody;
 
        const response = await Users.findByIdAndUpdate(
            userIdFromSession,
            { $inc: { coinCount: amount } },
            { new: true }
        ); 

        const responseTransaction = await Transactions.create({userId: userIdFromSession, description: description, amount: amount});
           
        return NextResponse.json({
            message: "Comment added successfully",
            status: true,
            response,
            responseTransaction
        });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
