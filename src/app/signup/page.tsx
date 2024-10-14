"use client";

import Link from "next/link";
import React from "react";

export default function SignupPage() {
    const [user , setUser]= React.useState({
        email: "",
        password: "",
        username: "",
    });

    const onSignup = async () => {}

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl text-blue-500 py-2 font-bold">Signup</h1>
        <hr />
        <label className="text-xl font-semibold " htmlFor="username">UserName</label>
        <input
            className="py-2 px-4 outline-none border border-gray-300 rounded-xl"
            type="text"
            id="username"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
           <label className="text-xl font-semibold " htmlFor="email">Email</label>
        <input
            className="py-2 px-4 outline-none border border-gray-300 rounded-xl"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
           <label className="text-xl font-semibold " htmlFor="password">Password</label>
        <input
            className="py-2 px-4 outline-none border border-gray-300 rounded-xl"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={onSignup}
        >
            Signup
        </button>
        <Link className="text-blue-500 text-sm underline underline-offset-2" href="/login">
            Already have an account? Login
        </Link>
        </div>
    );
}