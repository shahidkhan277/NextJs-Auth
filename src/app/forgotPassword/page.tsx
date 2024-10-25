"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    const onSubmitEmail = async () => {
        try {
            const response = await axios.post("/api/users/forgotPassword", { email });
            if (response.data.success) {
                toast.success("A password reset link has been sent to your email!");
                setMessage({
                    type: "success",
                    text: "A password reset link has been sent to your email!",
                });
            } else {
                setMessage({
                    type: "error",
                    text: "Something went wrong. Please try again.",
                });
            }
        } catch (error: any) {
            if (error.response?.status === 400) {
                toast.error("Please enter a valid email address.");
                setMessage({
                    type: "error",
                    text: "We couldn't find an account with that email. Please check your email or sign up.",
                });
            } else {
                setMessage({
                    type: "error",
                    text: "An error occurred. Please try again later.",
                });
            }
        }
    };

    React.useEffect(() => {
        setButtonDisabled(email.length === 0);
    }, [email]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2">
            <h1 className="text-3xl font-bold py-4">Forgot Password</h1>
            <p className="text-center mb-4">Enter your email to reset your password</p>
            <input
                className="py-2 px-4 w-80 outline-none border border-gray-300 text-black rounded-xl"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className={`py-2 px-4 mt-4 w-80 rounded-xl font-semibold ${buttonDisabled ? "bg-gray-400" : "bg-white text-blue-600"}`}
                onClick={onSubmitEmail}
                disabled={buttonDisabled}
            >
                Submit
            </button>

            {/* Message display for success or error */}
            {message && (
                <div
                    className={`mt-4 text-center p-2 w-80 rounded-xl font-semibold ${
                        message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <Link className="text-white text-sm underline underline-offset-2 mt-4" href="/login">
                Back to Login
            </Link>
        </div>
    );
}
