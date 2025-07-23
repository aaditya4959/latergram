import GoTo from "../assets/icons/GoTo";
import Trash from "../assets/icons/Trash";
import Twitter from "../assets/icons/Twitter";
import Youtube from "../assets/icons/Youtube";
import axios from "axios";
import React, { useEffect, useRef } from "react";
//@ts-ignore
const IP_ADDRESS = import.meta.env.VITE_REACT_APP_BACKEND_IP || process.env.REACT_APP_BACKEND_IP;


interface PostCardProps {
    type: "Youtube Video" | "Twitter/X Post" ;
    title: string;
    description?: string | "";
    link: string;
    id: string;
}

function getYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
}

export default function PostCard (props : PostCardProps) {
    const {type, title, description,link, id } = props;
    const tweetRef = useRef<HTMLDivElement>(null);

    const handleDelete = async () => {
        const response = await axios.delete(`api/v1/content`,{
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

    // Twitter embed effect
    useEffect(() => {
        if (type === "Twitter/X Post" && tweetRef.current) {
            tweetRef.current.innerHTML = "";
            const blockquote = document.createElement("blockquote");
            blockquote.className = "twitter-tweet";
            const a = document.createElement("a");
            a.href = link;
            blockquote.appendChild(a);
            tweetRef.current.appendChild(blockquote);
            if ((window as any).twttr && (window as any).twttr.widgets) {
                (window as any).twttr.widgets.load(tweetRef.current);
            }
        }
    }, [type, link]);

    return (
        <div className="flex flex-col gap-4 justify-between items-start w-full max-w-2xl mx-auto p-6 bg-white shadow-lg border border-gray-100 rounded-2xl font-mono transition-all duration-200 hover:shadow-2xl">
            {/* Meta information */}
            <div className="flex flex-row w-full justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    {type === "Youtube Video" ? (
                        <Youtube size="lg" color="youtube" />
                    ) : (
                        <Twitter size="lg" color="twitter" />
                    )}
                    <span className="text-xs text-gray-400 font-semibold px-2 py-1 bg-gray-50 rounded-md border border-gray-200">
                        {type === "Youtube Video" ? "YouTube" : "Twitter/X"}
                    </span>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-110 transition"
                        title="Open Original"
                    >
                        <GoTo size="md" color="secondary" />
                    </a>
                    <button onClick={handleDelete} className="hover:scale-110 transition" title="Delete">
                        <Trash size="md" color="danger" />
                    </button>
                </div>
            </div>

            {/* Content division with embedding */}
            <div className="flex flex-col gap-2 w-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-1 break-words">{title}</h2>
                {description && (
                    <p className="text-gray-500 text-base mb-2 break-words">{description}</p>
                )}
                {type === "Youtube Video" && getYouTubeVideoId(link) && (
                    <div className="my-2 w-full flex justify-center rounded-lg overflow-hidden border border-gray-200 bg-black/5">
                        <iframe
                            width="100%"
                            height="220"
                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(link)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="rounded-lg w-full max-w-xl"
                        ></iframe>
                    </div>
                )}
                {type === "Twitter/X Post" && (
                    <div className="my-2 w-full flex justify-center rounded-lg overflow-hidden border border-gray-200 bg-blue-50/30">
                        <div ref={tweetRef} style={{ width: "100%" }} />
                    </div>
                )}
            </div>
        </div>
    );
}