"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const TagSchema = new mongoose_2.Schema({
    title: { type: String, required: true, unique: true }
});
exports.TagModel = mongoose_1.default.model("Tag", TagSchema); // the name of the collection will be the plural of first argument.
