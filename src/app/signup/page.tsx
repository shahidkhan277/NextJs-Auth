"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user);
            console.log(response.data);
            toast.success("Signup successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user.email && user.password && user.username) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white shadow-lg rounded-lg px-8 py-10 w-full max-w-md">
                <h1 className="text-3xl font-bold text-purple-600 text-center mb-6">Signup</h1>
                <div className="space-y-4">
                    <label className="text-base text-purple-600" htmlFor="username">Username</label>
                    <input
                        className="w-full text-black py-2 px-4  border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />

                    <label className="text-base text-purple-600" htmlFor="email">Email</label>
                    <input
                        className="w-full text-black py-2 px-4  border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />

                    <label className="text-base text-purple-600" htmlFor="password">Password</label>
                    <input
                        className="w-full text-black py-2 px-4  border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <button
                    disabled={buttonDisabled}
                    className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${
                        buttonDisabled
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                    onClick={onSignup}
                >
                    Signup
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link className="text-purple-500 hover:underline" href="/login">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
