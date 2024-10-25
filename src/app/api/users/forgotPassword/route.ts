import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(request: NextRequest){
        try {
            const reqBody = await request.json();
            const {email} = reqBody;
            console.log(email , "Email");

            const user = await User.findOne({email});
            if(!user){
                return NextResponse.json({error: "User not found"}, {status: 400});
            }
            console.log(user , "User");
            
            // send email with token
            await sendEmail({email, emailType: "RESET", userId: user._id});

            return NextResponse.json({
                message: "Password reset email sent successfully!",
                success: true,
            });

        } catch (error:any) {
            return NextResponse.json({error: error.message}, {status: 500});
            
        }
}