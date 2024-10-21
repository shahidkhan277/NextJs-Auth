"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user , setUser]= React.useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onLogin = async () => {
        try {
          const response= await axios.post("/api/users/login", user);
            console.log(response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
            
        }
    }

    React.useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user]);

    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl text-blue-500 py-2 font-bold ">Login</h1>
           <label className="text-xl font-semibold " htmlFor="email">Email</label>
        <input
            className="py-2 px-4 outline-none border border-gray-300 text-black rounded-xl"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
           <label className="text-xl font-semibold " htmlFor="password">Password</label>
        <input
            className="py-2 px-4 outline-none border border-gray-300 text-black rounded-xl"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
            onClick={onLogin}
            disabled={buttonDisabled}
        >
            Login
        </button>
        <Link className="text-blue-500 text-sm underline underline-offset-2" href="/signup">
            Didnt have an account? Signup
        </Link>
        </div>
    );
}