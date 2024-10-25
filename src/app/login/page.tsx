"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user);
            console.log(response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        setButtonDisabled(user.email.length === 0 || user.password.length === 0);
    }, [user]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2">
            <h1 className="text-3xl font-bold py-4">Login</h1>
            <label className="text-xl font-semibold" htmlFor="email">Email</label>
            <input
                className="py-2 px-4 w-80 outline-none border border-gray-300 text-black rounded-xl"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label className="text-xl font-semibold" htmlFor="password">Password</label>
            <input
                className="py-2 px-4 w-80 outline-none border border-gray-300 text-black rounded-xl"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                className={`py-2 px-4 mt-4 w-80 rounded-xl font-semibold ${buttonDisabled ? "bg-gray-400" : "bg-white text-blue-600"} `}
                onClick={onLogin}
                disabled={buttonDisabled}
            >
                Login
            </button>
            <Link className="text-white text-sm underline underline-offset-2 mt-4" href="/forgotPassword">
                Forgot Password?
            </Link>
            <Link className="text-white text-sm underline underline-offset-2 mt-2" href="/signup">
                Don't have an account? Signup
            </Link>
        </div>
    );
}
