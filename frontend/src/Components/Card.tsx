
import Link from "../Icons/Link";
import Share from "../Icons/Share";
import Trash from "../Icons/Trash";

interface CardProps{
    title: string;
    link:string;
    type: "twitter" | "youtube";
}

export function Card({title, link, type} : CardProps){

    // The share icon needs to be changes in the component to the platform icon.
    // And also the embedding of the tweet can be resolved easily by using the stack overflow.
    return (
        <div className="bg-white rounded-md shadow-md border border-grey-100 outline-slate-400 p-4 w-full max-w-fit ">
            <div className="flex justify-between items-center text-xs text-grey-200 rounded-md  px-2 py-1 text-gray-500">
                <div>
                    <Share size="sm"/> 
                </div>
                <div>
                    {title} 
                </div>
                
                <div className="flex justify-between items-center">
                    <a href={link} className="mr-2" target="_blank">
                        <Link size="sm"/>
                    </a>
                    
                    <Trash size="sm"/>
                </div>
            </div>

            <div className="pt-4 ">
                {type === "youtube" && (
                    <iframe
                    className="w-full rounded-md h-[150px]"
                    src={link.replace("watch","embed")} // for embedding link.
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    ></iframe>
                )}

                {type === "twitter" && 
                    
                    <blockquote
                        className="twitter-tweet "
                    >
                        <a href={link.replace("x.com","twitter.com")}></a>
                    </blockquote>
                    
                }
            </div>

            
            
        </div>
    )
}