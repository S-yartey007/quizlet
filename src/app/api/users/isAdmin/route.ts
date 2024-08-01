import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"
connect(process.env.MONGO_USER_URI!)


export  async function GET(request: NextRequest) {
    const reqBody = await request.json();
    const {email,password} = reqBody
    console.log(reqBody)

    //Check if user exits
    const user = await User.findOne({email})
    if(!user) {
        return NextResponse.json({error: "User does not exist"})
        
    }
    if(user.isAdmin) {
        return true
    }

}