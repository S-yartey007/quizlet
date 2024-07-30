import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { NextRequest,NextResponse } from 'next/server';
connect(process.env.MONGO_USER_URI!)

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        console.log(`User reqBody${reqBody}`);

     const user =  await User.findOne({email});
     if(user) {
        return NextResponse.json({error: "User already exists"}, {status: 400})

     }
     //hash password
     const salt = await bcryptjs.genSalt(10);
     const hashedPassword = await bcryptjs.hash(password,salt)
     console.log(hashedPassword)

     //Create user
     const newUser = new User({
        username,
        email,
        password : hashedPassword
     })
     const savedUser = await newUser.save()
     console.log(savedUser)

     //send verification email

     return NextResponse.json({
        message: "user created successfully",
        success: true,
        savedUser
     })

    } catch(error: any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status: 500})


    }
    
}

