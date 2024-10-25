import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password, confirmPassword } = reqBody;

      

        if (!token) {
            return NextResponse.json({ error: "Invalid Token" }, { status: 400 });
        }

        // Find user by the reset token
        const user = await User.findOne({ forgotPasswordToken: token });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        // Check if the token has expired
        const currentTime = new Date();
        if (user.forgotPasswordTokenExpiry < currentTime) {
            return NextResponse.json({ error: "Token has expired" }, { status: 400 });
        }

        // Encrypt the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the password and clear the reset token and expiry
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Password reset successfully!", success: true });

    } catch (error: any) {
        console.error("Error resetting password:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
