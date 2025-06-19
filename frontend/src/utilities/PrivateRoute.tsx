import type { JSX } from "react";
import { useAuthStore } from "../stores/authStore";
import { Navigate, useNavigate } from "react-router-dom";



export default function PrivateRoute({children}:{children: JSX.Element}){
    const {isAuthenticated} = useAuthStore();
    

    if(!isAuthenticated){
        return <Navigate to={"/signin"}/>;
    }else{
        return children;
    }
}