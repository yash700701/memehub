
import { connect } from "@/dbConfig/dbConfig";
import Users from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const {userIdFromSession} = reqBody;
    
    if (!userIdFromSession) {
        return NextResponse.json({ error: "Missing userName" }, { status: 400 });
    }

    const res = await Users.findOne({_id: userIdFromSession});

    return NextResponse.json({
      status: true,
      message: "User fetched successfully",
      res,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
