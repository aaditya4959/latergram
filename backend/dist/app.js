"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // This statement is possible due to typescript.
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("./models/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const checkToken_1 = __importDefault(require("./Controller/checkToken"));
const content_1 = require("./models/content");
const links_1 = require("./models/links");
const tags_1 = require("./models/tags");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // For cross origin resourcs sharing.
// 
// There is some problem in the dupllicate records found in the signup process (Some error comes).
// To be solved later.
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Signup Request Incoming");
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(411).json({ message: "Please enter all the details" });
    }
    try {
        // hashing the password
        const saltROunds = 10;
        const hashpwd = yield bcrypt_1.default.hash(password, saltROunds);
        const updatedUserName = username.toLowerCase();
        // Chheck for existing user
        const existingUser = yield users_1.UserModel.findOne({ updatedUserName });
        if (existingUser) {
            res.status(409).json({ message: "Username already taken" });
        }
        else {
            const user = new users_1.UserModel({
                username: updatedUserName,
                password: hashpwd
            });
            try {
                yield user.save();
                console.log("User saved successfully");
            }
            catch (saveErr) {
                console.error("Error while saving user:", saveErr);
            }
            // Sending a success response
            res.status(201).json({
                message: 'User registered successfully!',
                user: {
                    id: user._id,
                    username: user.username,
                },
            });
        }
    }
    catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({
            message: 'An error occurred while registering the user.'
        });
    }
}));
// Getting the private key for jwt
dotenv_1.default.config();
const privKey = process.env.PRIVATE_KEY || "1234";
// Signin request (User will be assigned the jwt in this step and will be stored in the browser only)
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Signin Request Incoming");
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(411).json({ message: "Please enter all the details" });
    }
    try {
        // Checking for existing user
        const updatedUserName = username.toLowerCase();
        const existingUser = yield users_1.UserModel.findOne({ username: updatedUserName });
        if (!existingUser) {
            res.status(401).json({ message: "Username does not exist" });
        }
        else {
            try {
                // Checking for password match
                const isMatch = yield bcrypt_1.default.compare(password, existingUser.password);
                if (!isMatch) {
                    res.status(403).json({ message: "Invalid Password" });
                }
                else {
                    // Generating the jwt token
                    const token = jsonwebtoken_1.default.sign({ userId: existingUser._id }, privKey, { expiresIn: "1h" }); // Carefully check that what is being signed.
                    console.log("JWT Token generated successfully");
                    res.status(200).json({
                        token: token,
                        user: {
                            username,
                            password
                        }
                    });
                }
            }
            catch (err) {
                res.status(500).json({ message: "An error occurred while checking the password" });
            }
        }
    }
    catch (err) {
        console.error('Error while checking user:', err);
        res.status(500).json({ message: "An error occurred while checking the user" });
    }
}));
// content posting endpoint ( again the use of jwt)
/*
So basically we will be using the jwt token for the authorization fo the user and then he will be able to post the content.
We will make a middleware checkToken that will check the availability of the token. (Imported from another file in controllers)

*/
//@ts-ignore ( Some ts error in req and res cycle)
app.post("/api/v1/content", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { link, type, title, description, tags: rawTags } = req.body;
    try {
        // Step 1: Ensure tags are an array of strings
        const tagTitles = Array.isArray(rawTags)
            ? rawTags
            : typeof rawTags === "string"
                ? rawTags.split(",").map(t => t.trim())
                : [];
        // Step 2: Convert tag titles to ObjectIds (create if missing)
        const tagIds = [];
        for (const title of tagTitles) {
            let tagDoc = yield tags_1.TagModel.findOne({ title });
            if (!tagDoc) {
                const newTag = new tags_1.TagModel({ title });
                tagDoc = yield newTag.save(); // ✅ Reassign to get _id
            }
            if (tagDoc) {
                tagIds.push(tagDoc._id);
            }
        }
        // Step 3: Create and save content
        const post = new content_1.ContentModel({
            link,
            type,
            title,
            description,
            //@ts-ignore
            userId: req.userId, // @ts-ignore as needed
            tags: tagIds,
        });
        yield post.save();
        console.log("Post saved successfully");
        return res.status(201).json({ message: "Content saved successfully!" });
    }
    catch (error) {
        console.error("Error saving content:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
// get on content
app.get("/api/v1/content", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = yield content_1.ContentModel.find({ userId: userId }); // this will be an array of objects.
        // Send the array of data to the user
        res.status(200).json({
            content
        });
    }
    catch (err) {
        console.log(`Error in loading content: ${err}`);
        res.status(500).json({
            "message": "An error occurred while loading content"
        });
    }
}));
//delete on content
app.delete("/api/v1/content", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    if (!contentId) {
        res.status(400).json({
            "message": "Content ID is required"
        });
    }
    else {
        try {
            const deletedContent = yield content_1.ContentModel.findByIdAndDelete(contentId);
            if (!deletedContent) {
                res.status(404).json({
                    "message": "Content not found"
                });
            }
            else {
                res.status(200).json({
                    "message": "Content deleted successfully"
                });
            }
        }
        catch (err) {
            res.status(500).json({
                "message": "An error occurred while deleting content"
            });
        }
    }
}));
// sharable
app.post("/api/v1/brain/share", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const foundLink = yield links_1.LinkModel.find({
            //@ts-ignore
            userId: req.userId
        });
        if (foundLink) {
            res.json({
                "message": "The sharable link already exists."
            });
        }
        else {
            yield links_1.LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: (0, utils_1.random)(10),
            });
        }
    }
    else {
        yield links_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
    }
    res.json({
        "message": "Sharable Edited Successfully."
    });
}));
// Getting the content of the shared link
app.get("/api/v1/brain/share:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.shareLink;
        const links = yield links_1.LinkModel.findOne({ hash: hash });
        if (!links) {
            res.status(411).json({
                "message": "Sorry Incorrect Input"
            });
            return; // Stop execution after sending the response
        }
        const content = yield content_1.ContentModel.find({ userId: links.userId });
        const user = yield users_1.UserModel.findOne({ _id: links.userId }); // This is important.
        if (!user) {
            res.json({
                "message": "User not found (Ideally should not happen)"
            });
            return; // Stop execution after sending the response
        }
        res.json({
            "user": user === null || user === void 0 ? void 0 : user.username,
            "content": content
        });
    }
    catch (err) {
        // Handle unexpected errors
        res.status(500).json({
            "message": "An error occurred",
            "error": err.message
        });
    }
}));
exports.default = app;
