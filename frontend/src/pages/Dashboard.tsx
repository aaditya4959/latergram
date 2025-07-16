

import { useEffect, useState } from "react";
import Calender from "../assets/icons/Calender";
import Hike from "../assets/icons/Hike";
import Twitter from "../assets/icons/Twitter";
import Youtube from "../assets/icons/Youtube";
import AnalCard from "../components/AnalCard";
import Header from "../components/Header";
import InputCard from "../components/InputCard";
import PostCard from "../components/PostCard";

export default function Dashboard () {
    type Post = {
        type: "Youtube Video"|"Twitter/X Post";
        title: string;
        description: string;
        link: string;
        _id: string;
    };

    const [posts, setPosts] = useState<Post[]>([]);

    const countPost = () => posts.length;
    const countTwitterPosts = () => posts.filter(post => post.type === "Twitter/X Post").length;
    const countYoutubePosts = () => posts.filter(post => post.type === "Youtube Video").length;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/v1/content", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                setPosts(data.content);
            } catch (err) {
                console.error("Error fetching content:", err);
            }
        };
        fetchPosts();
        const interval = setInterval(fetchPosts, 5000);
        return () => clearInterval(interval);
    },[]);

    return (
        <>
            <Header/>
            <div className="flex flex-col font-mono h-[120vh] full justify-start items-center p-6 m-auto">
                {/* heading division  */}
                <div className="flex flex-col w-7/8  items-start justify-center text-center  p-4 m-2">
                    <h1 className="text-4xl font-bold">Your Content Library</h1>
                    <p className="text-gray-400">Save, organize, and discover insights from your favorite content.</p>
                </div>
                {/* Analytics Division  */}
                <div className="flex flex-row w-7/8 h-[175px] bg-gradient-to-r from-[#72a2f4] to-[#b787fe] p-4 m-2 shadow-lg justify-around items-center text-center rounded-2xl">
                    <AnalCard title="Total Saved" icon={<Calender size="lg" color="primary"/>} count={countPost()}/>
                    <AnalCard title="Twitter Posts" icon={<Twitter size="lg" color="twitter"/>} count={countTwitterPosts()}/>
                    <AnalCard title="Youtube Videos" icon={<Youtube size="lg" color="youtube"/>} count={countYoutubePosts()}/>
                </div>
                {/* Posts Division  */}
                <div className="flex flex-row w-7/8 justify-between items-start text-center my-10">
                    {/* This division will have two sub division left for posting and right for all the posts.  */}
                    <div className="w-2/5 ">
                        <InputCard/>
                    </div>
                    {/* Right sub division the shadow in here will be removed just for dev purpose only */}
                    <div className="flex flex-col w-4/5  justify-start items-center text-center   bg-white  rounded-lg font-mono overflow-y-scroll gap-4 mx-2">
                        {posts.slice().reverse().map((post) => (
                            <PostCard
                                key={post._id}
                                id={post._id}
                                type={post.type}
                                title={post.title}
                                description={post.description}
                                link={post.link}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}