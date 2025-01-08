"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const privKey = process.env.PRIVATE_KEY || "1234";
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        const decoded = jsonwebtoken_1.default.verify(token, privKey);
        if (decoded) {
            //@ts-ignore
            req.userId = decoded.userId; // Here is some ts error to be solved later.
        }
        next();
    }
    else {
        //If header is undefined return Forbidden (403)
        res.status(403).json({ "message": "You are not Signed in!" });
    }
};
exports.default = checkToken;
