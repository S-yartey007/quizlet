import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from 'next/server';
import jwt from "jsonwebtoken"

connect(process.env.MONGO_USER_URI!)


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody
        console.log(reqBody)

        //Check if user exits
        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({error: "User does not exist"})

        }
        //Check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Invalid password"},{status: 400});

        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
            
        }
        // create token
       const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: "1d"});

       const response = NextResponse.json({
        data: user
       })
       response.cookies.set("token",token,
        {
            httpOnly: true,
        }
       )
       return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}