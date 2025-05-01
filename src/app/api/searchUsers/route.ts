// /pages/api/searchUsers.ts

import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import Users from "@/models/userModel";

export async function POST(req: Request) {
  try {
    await connect();
    const { query } = await req.json();

    const users = await Users.find({
      userName: { $regex: query, $options: "i" }, // Case-insensitive partial match
    }).limit(10).lean();

    return NextResponse.json({ users });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
