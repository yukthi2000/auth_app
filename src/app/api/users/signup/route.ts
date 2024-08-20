import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { log } from "console";
import { NextRequest,NextResponse } from "next/server";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {name,email,password}=reqBody
        console.log(reqBody);

        
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
        
    }
}