import mongoose from "mongoose";
import {Schema} from "mongoose";

const contentTypes = ["image", "video", "article"];


const Contentschema = new Schema ( {
    link: { type: String, required: true },
    type: { type: String,  required: true },  //enum: contentTypes
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});


export const ContentModel = mongoose.model("Content", Contentschema);