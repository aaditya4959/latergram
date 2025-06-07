
import { Link } from "react-router-dom"
import Clock from "../assets/icons/Clock"
import QuickSave from "../assets/icons/QuickSave"
import SaveIcon from "../assets/icons/SaveIcon"
import Search from "../assets/icons/Search"
import RightArrow from "../assets/icons/RightArrow"


 // May use some shadcn components for the uI here
export default function Hero() {
    return (
        <div className="h-[calc(100vh-5rem)] w-full bg-gradient-to-br from-[#131b33] via-[#253c86] to-[#131b33] flex flex-col justify-center items-center text-center p-4 font-mono">
            {/* The watermark thing */}
            <div className="flex flex-row p-4 justify-center items-center text-center border-1 rounded-full text-[#9dc4f8]  shadow-lime-50 ">
                <SaveIcon size="lg" color="default"/>
                <p className="ml-2">Save. Organize. Query. Discover.</p>
            </div>

            {/* he main content */}
            <div className="text-6xl font-bold my-6 text-white">
                <p>Never Lose</p>
                <p className="bg-gradient-to-r from-[#72a2f4] to-[#b787fe] bg-clip-text text-transparent">Important Content</p>
                <p>Again</p>
            </div>

            {/* SubPara  */}
            <div className="text-2xl my-4 text-white">
                <p>Save tweets and YouTube videos when you're busy, then explore</p>
                <p>them later with AI-powered search. Turn information overload into</p>
                <p>organized knowledge.</p>
            </div>

            {/* Get Started for bree part  */}
            <div className="my-4 text-white">
                <Link to={"/get-started"} className="bg-[#267beb] flex p-4 text-2xl justify-center rounded-3xl text-center items-center">
                    <p className="px-4">Get Started</p>
                    <RightArrow size="lg" color="default"/>
                </Link>
            </div>

            {/* Feature tags  */}
            <div className="w-3/4 my-4 text-xl" >
                <ul className="flex flex-row justify-around items-center text-center text-[#9dc4f8]">

                    <li className="flex items-center"><QuickSave size="lg" color="primary"/> <p className="mx-4">Quick Save</p></li>
                    <li className="flex items-center"><Search size="lg" color="secondary"/> <p className="mx-4">AI Search</p></li>
                    <li className="flex items-center"><Clock size="lg" color="tertiary"/> <p className="mx-4">Read Later</p></li>

                </ul>

            </div>

        </div>
    )
}