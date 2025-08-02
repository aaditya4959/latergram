import Header from "@/components/Header"
import {motion} from "motion/react"


export const About = () => {
    return (
        <>
        <Header/>
        <motion.div className="min-h-screen flex flex-col ">
            <div className="w-full h-auto p-4 flex items-center justify-center bg-[#313877] text-white text-sm">Pricing</div>
            <motion.div className="w-full flex-1 bg-gradient-to-b from-[#1a205c] to-[#f7f5fe] flex flex-col p-4 items-center justify-start text-white">
                <motion.h1 className="text-[2rem] text-white mt-5 font-sans p-2">LaterGram</motion.h1>
                <motion.p className="text-[5rem] drop-shadow-xl/50  shadow-amber-100 bg-gradient-to-r from-[#72a2f4] to-[#b787fe] bg-clip-text text-transparent p-2"
                initial={{
                    opacity:0,
                    y:20,
                    fontSize:"5rem"
                }}
                animate={{
                    opacity:1,
                    y:0,
                    fontSize:"4rem"
                }}
                transition={{
                    duration:2.0,
                    ease:"easeInOut"
                }}
                >Built for building Intelligence.</motion.p>

                {/* The laptop screen that rotates  */}
                

                <div className="perspective-[1000px]">
                    <motion.div className="w-[60rem] h-[40rem] rounded-lg shadow-lg flex items-center justify-center mt-5 bg-neutral-700 p-2"
                        initial = {{
                            rotateY: 0,
                            rotateX: 40,
                            y:80,
                            scale: 1.0,
                        }}
                        animate = {{
                            rotateY: 0,
                            rotateX: 0,
                            y:0,
                            scale: 1.0
                        }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.div className="w-full h-full bg-neutral-900 rounded-lg shadow-lg flex items-center justify-center p-2">
                            <motion.img src="/laptop.png" alt="Demo Dashboard"  className="w-full h-full rounded-b-lg"/>
                            </motion.div>
                    </motion.div>
                </div>

            </motion.div>
        </motion.div>

        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f7f5fe] to-[#f5f4f9] p-4 text-black w-full font-sans">
            <h2 className="text-[3rem] ml-[5rem] mt-[3rem] font-semibold">All the Good Stuff</h2>
            <div className="grid grid-cols-2 grid-rows-2 border mx-[5rem] my-[2rem] flex-1"></div>
        </div>
        </>
    )
}