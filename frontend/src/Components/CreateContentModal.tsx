import { useRecoilState } from "recoil";
import { Cross } from "../Icons/Cross";
import { Button } from "./Button";
import Input from "./Input";
import { modalState } from "../Atoms/modalState";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";




export default function CreateContentModal(){

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);
    

    async function postContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = typeRef.current?.value;

        const token = localStorage.getItem("token");

        if(title && link && type){
            try{
                await axios.post(`${BACKEND_URL}/api/v1/content`, 
                    { title, link, type }, // Data
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Content created successfully!");
                setModalOpen(false);
                // Improvement needed here.
            }catch(err){
                console.log(`Err in posting content ${err}`);
            }
            
        }else{
            alert("Please fill all the fields");
        }
    }
    
    const [modalOpen, setModalOpen ] = useRecoilState(modalState);
    return(
       <div>
        {
        modalOpen && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            {/* Semi-transparent background */}
                    <div className="absolute w-full h-full bg-slate-200 opacity-70"></div>  {/*This is treated as separate*/}
        
            {/* Modal Window */}
                    <div className="relative flex flex-col justify-center bg-blue-600 p-4 rounded shadow-md">
                        <span className="flex flex-row justify-between items-center text-white font-medium">
                            <span className="mr-4">Create Content</span>
                            <div className="felx justify-end cursor-pointer" onClick={() => setModalOpen(false)}>
                                
                                <Cross size="md"/>
                            </div>
                            
                        </span>
                        <div className="flex flex-col justify-center ">
                                <Input placeHolder="Title" ref={titleRef}/>
                                <Input placeHolder="Link" ref={linkRef}/>
                                <Input placeHolder="Type" ref={typeRef}/>
                                <br />

                                <Button onClick={() => {
                                    postContent();
                                    setModalOpen(false);
                                }} variant="secondary" size="lg" text="Create"/>

                        </div>
                    </div>
        </div>
    
       }
       </div>
    )
}