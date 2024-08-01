import { getDateToken } from "@/helpers/dataToken";
import { NextRequest,NextResponse } from "next/server";
import {connect} from '@/dbConfig/dbConfig'

import User from "@/models/userModel";
import axios from "axios";

connect(process.env.MONGO_USER_URI!);

export async function GET(request: NextRequest) {
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