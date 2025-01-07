import mongoose from "mongoose";

export  const db = async () => {
    try{
        await mongoose.connect("mongodb+srv://aadibirsingh:TnA5DETQdeg3IejG@cluster0.wwvkh.mongodb.net/latergram")
        console.log("Connected to database");
    }catch(err){
        console.log(`Err in connection to database: ${err}`);
    }

}

