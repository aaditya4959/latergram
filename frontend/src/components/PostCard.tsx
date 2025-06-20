import GoTo from "../assets/icons/GoTo";
import Trash from "../assets/icons/Trash";
import Twitter from "../assets/icons/Twitter";
import Youtube from "../assets/icons/Youtube";
import axios from "axios";


interface PostCardProps {
    type: "Youtube Video" | "Twitter/X Post" ;
    title: string;
    description?: string | "";
    link: string;
    id: string;
}



export default function PostCard (props : PostCardProps) {

    const {type, title, description,link, id } = props;

    const handleDelete = async () => {
        const response = await axios.delete("http://localhost:8080/api/v1/content",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include if using token auth
            },
            data: {
                contentId: id
            }

        });
        if (response.status === 200) {
            console.log("Content deleted successfully");
            // Optionally, you can update the state to remove the deleted post from the UI
        }
        else {  
            console.error("Failed to delete content");
        }
    };

    return (
        <div className="flex flex-col justify-around items-start text-start min-w-full p-4  bg-white shadow-md border border-gray-200 rounded-lg font-mono">
            {/* The meta information division  */}
            <div className="flex flex-row w-full justify-between items-center text-center p-2">
                <div>
                    {
                        type === "Youtube Video" ? 
                        <Youtube size="lg" color="youtube"/> :
                        <Twitter size="lg" color="twitter"/>
                    }
                </div>
                <div className="flex flex-row justify-between items-center text-center gap-2">

                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition"
                    >
                        <GoTo size="md" color="secondary" />
                    </a>

                    <div onClick={handleDelete} className="cursor-pointer hover:scale-110 transition">
                        <Trash size="md" color="danger" />
                    </div>

                </div>

            </div>

            {/* THe content division  */}
            <div className="flex flex-col p-2 m-2 justify-around items-start font-mono">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-400">{description}</p>

            </div>
        </div>
    )
}