

import Calender from "../assets/icons/Calender";
import Hike from "../assets/icons/Hike";
import Twitter from "../assets/icons/Twitter";
import Youtube from "../assets/icons/Youtube";
import AnalCard from "../components/AnalCard";
import Header from "../components/Header";
import InputCard from "../components/InputCard";
import PostCard from "../components/PostCard";


export default function Dashboard () {

    

    return (
        <>
            <Header/>
            <div className="flex flex-col font-mono h-[120vh] full justify-start items-center p-6 m-auto">
            

                {/* // heading division  */}
                    <div className="flex flex-col w-7/8  items-start justify-center text-center  p-4 m-2">
                        <h1 className="text-4xl font-bold">Your Content Library</h1>
                        <p className="text-gray-400">Save, organize, and discover insights from your favorite content.</p>
                    </div>

                    {/* Analytics Division  */}
                    <div className="flex flex-row w-7/8 h-[175px] bg-gradient-to-r from-[#72a2f4] to-[#b787fe] p-4 m-2 shadow-lg justify-around items-center text-center rounded-2xl">
                        <AnalCard title="Total Saved" icon={<Calender size="lg" color="primary"/>} count={5}/>
                        <AnalCard title="Twitter Posts" icon={<Twitter size="lg" color="twitter"/>} count={3}/>
                        <AnalCard title="Youtube Videos" icon={<Youtube size="lg" color="youtube"/>} count={2}/>
                        <AnalCard title="This Week" icon={<Hike size="lg" color="success"/>} count={0}/>
                    </div>


                    {/* Posts Division  */}
                    <div className="flex flex-row w-7/8 justify-between items-start text-center my-10">
                        {/* This division will have two sub division left for posting and right for all the posts.  */}
                        <div className="w-2/5 ">
                            <InputCard/>
                        </div>

                        {/* Right sub division the shadow in here will be removed just for dev purpose only */}
                        <div className="flex flex-col w-3/5  justify-start items-center text-center   bg-white  rounded-lg font-mono overflow-y-scroll gap-4">
                            <PostCard type="youtube" title="Web Dev Course" description="This is the best web development course a person can see in their whole life." link="sdjkhfashdfjk"/>
                            <PostCard type="twitter" title="Musk pisses Trump" description="What the hell is wrong going on between Elon Musk and President Donald Trump." link="sdjkhfashdfjk"/>
                        </div>
                    </div>
            </div>
        </>
        
        
    )
}