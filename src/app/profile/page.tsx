"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [isMessage, setIsMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/userDetails");
        setUser(data.data);
        setIsMessage(data.message);
        setIsLoading(false);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    };
    fetchUser();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl text-blue-500">Loading...</h1>
    </div>
  ) : (

    <div className="min-h-screen bg-gray-50">
    <Navbar /> {/* Include Navbar */}
    <div className="flex flex-col items-center justify-center py-10 ">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Profile</h1>
        <hr className="border-gray-300 mb-6" />
        <h2 className="text-xl font-semibold text-blue-950 mb-4">User Profile</h2>
        <div className="flex flex-col items-center space-y-4">
          <p className="text-blue-text-white font-bold">
            <span className="font-semibold text-white">Username:</span> {user?.username}
          </p>
          <p className="text-gray-text-white">
            <span className="font-semibold text-white">Email:</span> {user?.email}
          </p>
          <p className="text-gray-text-white">
            <span className="font-semibold text-white">Message:</span> {isMessage}
          </p>
          <h2 className="font-semibold text-white">Verfication Status: <span className="font-normal">{user?.isVerified === true ? "Verified User" : "Not Verified"}</span></h2>
        </div>
        <button
          className="mt-8 bg-white text-purple-900 px-6 py-2 rounded-full hover:bg-blue-500 transition duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
  );
}
