"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";



export default function VerifyEmail() {
        const [token , setToken] = useState("");
        const [verified , setVerified] = useState(false);
        const [error , setError] = useState(false);

        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/users/verifyemail" , {token})
                setVerified(true);

            } catch (error) {
                setError(true);
                console.log(error.response.data);
            }
        }
    
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken ||"");

    }, []);

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1 className="text-4xl">Verify Your Email</h1>
         <h2 className="p-2 bg-orange-500 text-black mt-5">{token ? `${token}` : "No Token"}</h2>
            {verified && <h1 className="mt-5 text-2xl text-green-500">Email Verified</h1>}
            {error && <h1 className="mt-5 text-2xl text-red-500">Error Verifying Email</h1>}
        </div>
    )
}