import Header from "@/components/Header"
import {AnimatePresence, motion} from "motion/react"
import cardData from "../../data/about.json"
import { useState } from "react"
import { Footer } from "@/components/Footer"


export const About = () => {

    const [currentCard, setCurrentCard] = useState<typeof cardData[0] | null>(null);

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
            <motion.h2 className="text-[3rem] ml-[5rem] mt-[3rem] font-semibold" initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} transition={{duration:0.3 , ease:"easeInOut"}}>All the Good Stuff</motion.h2>
            <motion.div className="grid grid-cols-2 grid-rows-2  mx-[5rem] my-[2rem] flex-1  gap-2">
                {
                    cardData.map((item, index) => {
                        return (
                        <motion.div
                            className="flex flex-col items-center border p-4 rounded-lg shadow"
                            key={index}
                            onClick={() => setCurrentCard(item)}
                            layoutId={`card-${index}`}
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                                y: 10
                            }}
                            whileInView={{
                                opacity: 1,
                                scale: 1.0,
                                y: 0
                            }}
                            transition={{
                                duration:0.3,
                                ease: "easeInOut"
                            }}
                        >
                            <motion.h3 layoutId={`card-title-${index}`}>{item.title}</motion.h3>
                            <motion.p layoutId={`card-subtitle-${index}`}>{item.subtitle}</motion.p>
                        </motion.div>
                        );
                    })
                }

            </motion.div>
            
            <AnimatePresence>
                {
                    currentCard && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setCurrentCard(null)}
                    >
                        <motion.div
                        className="bg-white p-4 rounded-lg shadow-lg w-[60rem] h-[40rem] flex flex-col items-center justify-center text-black"
                        layoutId={`card-${cardData.indexOf(currentCard)}`}
                        >
                        <motion.h3 layoutId={`card-title-${cardData.indexOf(currentCard)}`}>{currentCard.title}</motion.h3>
                        <motion.p layoutId={`card-subtitle-${cardData.indexOf(currentCard)}`}>{currentCard.subtitle}</motion.p>
                        <motion.p initial={{
                            opacity:0,
                            scale:0.8
                        }}
                        animate={{
                            opacity:1,
                            scale:1.0  
                        }}
                        transition={{
                            duration:0.3,
                            ease:"easeInOut"
                        }}>{currentCard.content}</motion.p>
                        </motion.div>
                    </motion.div>
                    )
                }
            </AnimatePresence>

        </div>
                
        {/* Some additional divisions can be made here for showing animation skills  */}

        <Footer/>
        

    




        </>
    )
}