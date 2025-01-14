import { useRecoilState } from "recoil";
import { Cross } from "../Icons/Cross";
import { Button } from "./Button";
import Input from "./Input";
import { modalState } from "../Atoms/modalState";


interface ModalProps{
    open: boolean;
}

export default function CreateContentModal(props: ModalProps){
    
    
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
                            <div className="felx justify-end" onClick={() => setModalOpen(false)}>
                                
                                <Cross size="md"/>
                            </div>
                            
                        </span>
                        <div className="flex flex-col justify-center ">
                                <Input placeHolder="Title"/>
                                <Input placeHolder="Link"/>
                                <Input placeHolder="Tags" />
                                <br />

                                <Button variant="secondary" size="lg" text="Create"/>

                        </div>
                    </div>
        </div>
    
       }
       </div>
    )
}