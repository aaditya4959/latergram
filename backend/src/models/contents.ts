import mongoose from "mongoose";
import { Schema } from "mongoose";


const contentTypes = ['image', 'video', 'article', 'video'];


const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
})


const ContentModel = mongoose.model('Content', ContentSchema); // the name of the collection will be the plural of first argument.




module.exports = ContentModel;