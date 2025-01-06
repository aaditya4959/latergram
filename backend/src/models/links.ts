import mongoose from "mongoose";
import { Schema } from "mongoose";


const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
})

const LinkModel = mongoose.model('Link', LinkSchema);  // the name of the collection will be the plural of first argument.

module.exports = LinkModel;