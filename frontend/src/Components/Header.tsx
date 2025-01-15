
import {Button} from "./Button"
import Plus from "../Icons/Plus";
import Share from "../Icons/Share";
import { useRecoilState } from "recoil";
import { modalState } from "../Atoms/modalState";
import {userSignedIn} from "../Atoms/userSignedIn"
import { useState } from "react";
import Start from "@/Icons/Start";

export default function Header() {
    
    const [signedIn, ] = useRecoilState(userSignedIn);
    const [user,setUser] = useState({});
    

    const [modalOpen, setModalOpen] = useRecoilState(modalState);

    

    return (
        <div className="w-screen h-10 bg-white flex align-center text-blue-600 justify-between p-2 rounded-md shadow-lg font-bold">
            <h2>LaterGram</h2>

            {/* Conditional Rendering */}
            {signedIn ? (
                
                <div className="flex  justify-between ">
                   
                    <Button variant="secondary" size="sm" text="Share Brain" startIcon={<Share size="sm"/>}></Button>   
                    <Button variant="primary" size="sm" text="Add Content" startIcon={<Plus size="sm"/>} onClick={() => setModalOpen(true)}></Button>
                    
                </div>
            ) : (
                <div>
                    <Button variant="primary" size="sm" text="Get Started" startIcon={<Start size="sm"/>}></Button>
                </div>
            )}
            
        </div>
    );
}
