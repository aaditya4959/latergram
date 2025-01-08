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
const dbConnection_1 = require("./Controller/dbConnection");
const dotenv_1 = __importDefault(require("dotenv"));
const checkToken_1 = __importDefault(require("./Controller/checkToken"));
const contents_1 = require("./models/contents");
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
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
                        token: token
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
app.post("/api/v1/content", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // first of all verify that the user is signed in
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    const post = new contents_1.ContentModel({
        link: link,
        type: type,
        title: title,
        //@ts-ignore
        userId: req.userId, // Here again some error is being shown up by the typescript.
        tags: []
    });
    try {
        yield post.save();
        console.log("Post saved successfully");
    }
    catch (saveErr) {
        console.error("Error while saving Post:", saveErr);
    }
    // Sending a success response
    res.status(201).json({
        message: 'Brain Created successfully!'
    });
}));
// get on content
app.get("api/v1/content", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
//delete on content
app.delete("api/v1/content:id", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// sharable
app.post("api/v1/brain/share", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// Getting the content of the shared link
app.get("api/v1/brain/share:link", checkToken_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
// Call the database connection function and after that start the server.
(0, dbConnection_1.db)()
    .then(() => {
    // Start the server only after a successful DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error("Failed to connect to the database:", err);
});
