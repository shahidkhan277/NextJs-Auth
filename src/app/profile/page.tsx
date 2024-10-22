"use client";
import React,{ useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";


export default function ProfilePage() {
    const [user, setUser] = useState([]);
    const [isMessage, setIsMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");

        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get("/api/users/userDetails");
                setUser(data.data);
                setIsMessage(data.message);
                setIsLoading(false);

            } catch (error:any) {
                console.log(error);
                toast.error(error.message);
            }
        }
        console.log(user);
        fetchUser();
    }, []);

    return isLoading ? (
        <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl text-blue-500">Loading...</h1>
        </div>
    ) : (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl text-blue-500 py-2 font-bold">Profile</h1>
        <hr />
        <h2 className="text-xl font-semibold">User Profile</h2>
        <hr />
        <div className="flex flex-col gap-2">
        <Link className="text-blue-600 font-bold" href={`/profile/${user.username}`}>
        <span className="font-semibold text-white">Username: </span> {user.username}
        </Link>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Message:</span> {isMessage}</p>
        </div>
        <button
        className="bg-orange-500 text-white px-4 py-2 rounded-xl mt-5"
        onClick={logout}
        >
        Logout
        </button>
        </div>

    );
}