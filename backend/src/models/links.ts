import mongoose from "mongoose";
import { Schema } from "mongoose";


const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true , unique: true},
})

export const LinkModel = mongoose.model('Link', LinkSchema); 