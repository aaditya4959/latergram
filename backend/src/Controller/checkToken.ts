import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

interface CustomRequest extends Request{
    userId?:string;
}

dotenv.config();
const privKey = process.env.PRIVATE_KEY || "1234";

const checkToken = (req: CustomRequest, res:Response, next:NextFunction) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        const decoded = jwt.verify(token,  privKey);

        if(decoded){
            //@ts-ignore
            req.userId = decoded.userId;  // Here is some ts error to be solved later.
        }
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.status(403).json({"message":"You are not Signed in!"});
    }
}

export default checkToken;