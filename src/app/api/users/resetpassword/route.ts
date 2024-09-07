import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs'


connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {token, password } = reqBody;
        const currentTime = new Date(); // Current time

        // Find the user with the token and ensure the token is still valid (not expired)
        const user = await User.findOne({
            forgotpasswordToken: token,
            forgotpasswordToeknExpiry: { $gt: currentTime } // Check if verifyTokenExpiry is greater than currentTime
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        const salt= await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        // Update the user's verification status
        user.password = hashedpassword;
        user.forgotpasswordToken = undefined;
        user.forgotpasswordToeknExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password Rest Succcessfuly", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
