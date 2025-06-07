import type { JSX } from "react";

interface AnalCardProps {
    title : "Total Saved" | "Twitter Posts" | "Youtube Videos" | "This Week";
    icon : JSX.Element;
    count: number
}


export default function AnalCard(props : AnalCardProps){
    const {title, icon, count} = props;

    return(
        <div className="flex flex-col justify-between items-start p-4 m-2 w-1/4 h-[125px] bg-white rounded-2xl font-mono">
            {/* The top part  */}
            <div className="flex flew-row justify-between items-center text-center w-full ">
                
                <p className="text-xl ">{title}</p>
                <div>
                    {icon}
                </div>

            </div>

            {/* The count part  */}
            <div className="text-3xl font-bold">
                <p>{count}</p>
            </div>

        </div>
    )
}