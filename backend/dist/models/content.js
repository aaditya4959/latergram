"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const contentTypes = ["image", "video", "article"];
const Contentschema = new mongoose_2.Schema({
    link: { type: String, required: true },
    type: { type: String, required: true }, //enum: contentTypes
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'tags' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'users', required: true },
});
exports.ContentModel = mongoose_1.default.model("Content", Contentschema);
