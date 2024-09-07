import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token } = reqBody;
        const currentTime = new Date(); // Current time

        // Find the user with the token and ensure the token is still valid (not expired)
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: currentTime } // Check if verifyTokenExpiry is greater than currentTime
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Update the user's verification status
        user.isverified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Email verified successfully", success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
