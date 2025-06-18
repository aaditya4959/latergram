import axios from "axios";
import React, { useState } from "react";






export default function Authentication (){

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
        //Here we will send the authData to the backend for authentication
        axios.post("http://localhost:8080/api/v1/signin", {
            username: authData.username,
            password: authData.password
        })
        .then((response) => {
            console.log("Backend Response: ", response.data);
            // Here we will get a jwt token as response and we have to store it into the local storage
            localStorage.setItem('token', response.data.token);
        })
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-start w-full">
                <label className="text-sm font-medium text-gray-700 mb-1">Username</label>
                <input
                    type="username"
                    name="username"
                    placeholder="xyz@1234"
                    value={authData.username}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
            <div className="flex flex-col items-start w-full">
                <label className="text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                    type="password"
                    name="password"
                    placeholder="****"
                    value={authData.password}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
            >
                Sign In
            </button>
            </div>
        </form> 
    )
}