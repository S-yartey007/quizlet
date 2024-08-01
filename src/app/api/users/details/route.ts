import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'

import User from "@/models/userModel";

connect(process.env.MONGO_USER_URI!);

export async function GET() {
    try {
        const users = await User.find({})
        return NextResponse.json({
            message: "user found",
            Users: users
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message})
        
    }
}