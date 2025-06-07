import mongoose from "mongoose";
import {Schema} from "mongoose"



const TagSchema = new Schema({
    title: { type: String, required: true, unique: true }
})

const TagModel = mongoose.model("Tag", TagSchema);  // the name of the collection will be the plural of first argument.
module.exports = TagModel;