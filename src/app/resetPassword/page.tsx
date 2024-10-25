"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // Extract token from URL
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    }, []);

    const onResetPassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("/api/users/resetPassword", {
                token,
                password,
            });
            if (response.data.success) {
                toast.success("Password reset successfully!");
                router.push("/login");
            } else {
                toast.error(response.data.message || "Error resetting password");
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || "An error occurred. Please try again.");
        }
    };

    // Enable button when password fields are filled and match
    useEffect(() => {
        setButtonDisabled(password.length === 0 || password !== confirmPassword);
    }, [password, confirmPassword]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2">
            <h1 className="text-3xl font-bold py-4">Reset Password</h1>
            <p className="text-center mb-4">Enter a new password</p>

            <input
                className="py-2 px-4 w-80 outline-none border border-gray-300 text-black rounded-xl"
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="py-2 px-4 w-80 outline-none border border-gray-300 text-black rounded-xl"
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                className={`py-2 px-4 mt-4 w-80 rounded-xl font-semibold ${buttonDisabled ? "bg-gray-400" : "bg-white text-blue-600"}`}
                onClick={onResetPassword}
                disabled={buttonDisabled}
            >
                Reset Password
            </button>
        </div>
    );
}
