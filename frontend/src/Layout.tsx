// import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

export default function Layout(){

    return(
        <div>
        <Header></Header>
        <main>
            
            <Outlet/>
        </main>
        <br />
        
    </div>
    )
    
}