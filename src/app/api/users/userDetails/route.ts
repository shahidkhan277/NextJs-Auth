import { connect } from "@/dbConfig/dbConfig";
import { fetchDataFromToken } from "@/helpers/fetchDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest) {
    try {
        const userID = await fetchDataFromToken(request);
        const user = await User.findById({_id: userID}).select('-password');

        return NextResponse.json({
            message: "User details fetched successfully",
            data: user
        })

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}