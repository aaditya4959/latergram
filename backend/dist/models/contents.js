"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const contentTypes = ['image', 'video', 'article', 'video'];
const ContentSchema = new mongoose_2.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
});
const ContentModel = mongoose_1.default.model('Content', ContentSchema); // the name of the collection will be the plural of first argument.
module.exports = ContentModel;
