import axios from "axios";
import React, { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";

export default function Authentication (){
    const navigate = useNavigate();
    const signIn = useAuthStore((state) => state.signIn);
    const [authData, setAuthData] = useState({
        username:'',
        password:''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAuthData((prev : any) => ({...prev, [name]: value}));
    }
    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const userData = {
            username: authData.username,
            password: authData.password
        }
        console.log(userData);
        axios.post("http://localhost:8080/api/v1/signin", {
            userData
        })
        .then((response) => {
            const {user, token} = response.data;
            localStorage.setItem('token', token);
            signIn(user);
            navigate("/dashboard");
        }).catch((err) => {
            console.error("Authentication failed:", err);
            alert("Invalid credentials. Please try again.");
        })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#131b33] via-[#253c86] to-[#131b33] font-mono">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#72a2f4] to-[#b787fe] bg-clip-text text-transparent">Sign In to LaterGram</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="xyz@1234"
                            value={authData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#72a2f4] bg-gray-50"
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={authData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b787fe] bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#267beb] to-[#b787fe] text-white py-2 rounded-md font-semibold hover:from-[#1a5bb8] hover:to-[#8e5be8] transition"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-6 text-center w-full">
                    <span className="text-gray-600">Don't have an account? </span>
                    <a href="/signup" className="text-[#267beb] font-semibold hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    )
}