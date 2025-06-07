import {Information} from "../assets/data/Information.json"
import InfoCard from "./InfoCard"
// This component will be the second section on the landing page.

export default function InformationSection(){
    return (
        <div className="flex flex-col p-20 m-auto justify-around items-center h-[100vh]  font-mono">

            {/* heading Section */}
            <div className="font-bold text-center text-5xl" >
                <p className="">Everything You Need to</p>
                <p className="bg-gradient-to-r from-[#275bb5] to-[#b787fe] text-transparent bg-clip-text">Manage Your Content</p>
            </div>

            {/* Description Section  */}
            <div className="text-center text-xl my-2.5 w-3/4">
                <p>Latergram combines the best of content curation with cutting-edge AI to create your personal knowledge assistant.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    Information.map((item) => (
                        <InfoCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                        />
                    ))
                }
            </div>
        </div>
    )   
}