import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { log } from "console";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {username,email,password}=reqBody
        console.log(reqBody);

        const user= await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }
        //hashing password

        const salt= await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const newUser= new User(
            {username,email,password:hashedpassword}
        )
        
        const savedUser = await newUser.save()

        await sendMail({email:email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}