import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//@ts-ignore
const IP_ADDRESS = import.meta.env.REACT_APP_BACKEND_IP ;
// import.meta.env.VITE_REACT_APP_BACKEND_IP ;
// || process.env.REACT_APP_BACKEND_IP



export default function Signup() {
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignupData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`http://localhost:8080/api/v1/signup`, {
            username: signupData.username,
            password: signupData.password
        })
        .then((response) => {
            alert("Signup successful! Please sign in.");
            navigate("/signin");
        })
        .catch((err) => {
            alert(
                err.response?.data?.message ||
                "Signup failed. Please try again."
            );
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#131b33] via-[#253c86] to-[#131b33] font-mono">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#72a2f4] to-[#b787fe] bg-clip-text text-transparent">Sign Up for LaterGram</h2>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="xyz@1234"
                            value={signupData.username}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#72a2f4] bg-gray-50"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={signupData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#b787fe] bg-gray-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#267beb] to-[#b787fe] text-white py-2 rounded-md font-semibold hover:from-[#1a5bb8] hover:to-[#8e5be8] transition disabled:opacity-60"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <div className="mt-6 text-center w-full">
                    <span className="text-gray-600">Already have an account? </span>
                    <a href="/signin" className="text-[#267beb] font-semibold hover:underline">Sign in</a>
                </div>
            </div>
        </div>
    );
}