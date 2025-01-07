import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

// "mongodb+srv://aadibirsingh:TnA5DETQdeg3IejG@cluster0.wwvkh.mongodb.net/latergram"


export  const db = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("Connected to database");
    }catch(err){
        console.log(`Err in connection to database: ${err}`);
    }

}
