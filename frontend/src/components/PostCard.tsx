import GoTo from "../assets/icons/GoTo";
import Trash from "../assets/icons/Trash";
import Twitter from "../assets/icons/Twitter";
import Youtube from "../assets/icons/Youtube";


interface PostCardProps {
    type: "youtube" | "twitter" ;
    title: string;
    description?: string | "";
    link: string;
}



export default function PostCard (props : PostCardProps) {

    const {type, title, description,link } = props;

    const handleDelete = () => {
        
    }

    return (
        <div className="flex flex-col justify-around items-start text-start min-w-3/5 p-4  bg-white shadow-md border border-gray-200 rounded-lg font-mono">
            {/* The meta information division  */}
            <div className="flex flex-row w-full justify-between items-center text-center p-2">
                <div>
                    {
                        type === "youtube" ? 
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

                    <Trash size="md" color="danger"/>

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