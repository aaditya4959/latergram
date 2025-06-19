import express from "express";  // This statement is possible due to typescript.
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {UserModel} from "./models/users";
import bcrypt from "bcrypt";
import {db} from "./Controller/dbConnection"
import dotenv from "dotenv"
import checkToken from "./Controller/checkToken";
import {ContentModel} from "./models/content";
import {LinkModel} from "./models/links"
import {TagModel} from "./models/tags"
import { random } from "./utils";
import cors from "cors";
import mongoose from "mongoose";





const PORT = process.env.PORT || 8080;

const app = express();



app.use(bodyParser.json());
app.use(express.json());
app.use(cors());  // For cross origin resourcs sharing.

// 

// There is some problem in the dupllicate records found in the signup process (Some error comes).
// To be solved later.
app.post("/api/v1/signup", async (req , res) => {
    console.log("Signup Request Incoming");

    const {username, password} = req.body;

    if (!username || !password){
        res.status(411).json({message:"Please enter all the details"});
    }

    try{
        // hashing the password
        const saltROunds = 10;
        const hashpwd = await bcrypt.hash(password, saltROunds);
        const updatedUserName = username.toLowerCase();

        // Chheck for existing user
        const existingUser = await UserModel.findOne({updatedUserName});
        if (existingUser){
            res.status(409).json({message:"Username already taken"});
        }
        else{

            const user = new UserModel({
                username: updatedUserName,
                password: hashpwd
            })
    
            try {
                await user.save();
                console.log("User saved successfully");
            } catch (saveErr) {
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
    catch(err){
        console.error('Error registering user:', err);
        res.status(500).json({
            message: 'An error occurred while registering the user.'
        });
    }
});




// Getting the private key for jwt
dotenv.config();
const privKey = process.env.PRIVATE_KEY || "1234";

// Signin request (User will be assigned the jwt in this step and will be stored in the browser only)
app.post("/api/v1/signin", async (req , res) =>{
    console.log("Signin Request Incoming");

    const {username, password} = req.body;

    if(!username || !password){
        res.status(411).json({message:"Please enter all the details"});
    }

    try{
        // Checking for existing user
        const updatedUserName = username.toLowerCase();
        const existingUser = await UserModel.findOne({username:updatedUserName});
        if(!existingUser){
            res.status(401).json({message:"Username does not exist"});
        }
        else{
            try {
                // Checking for password match
                const isMatch = await bcrypt.compare(password, existingUser.password);
                if(!isMatch){
                    res.status(403).json({message:"Invalid Password"});
                }
                else{
                    // Generating the jwt token
                    const token = jwt.sign({userId:existingUser._id}, privKey, {expiresIn:"1h"}); // Carefully check that what is being signed.
                    console.log("JWT Token generated successfully");

                    res.status(200).json({
                        token: token,
                        user: {
                            username,
                            password
                        }
                    });
                }
            }catch(err){
                res.status(500).json({message:"An error occurred while checking the password"});

            }
        }
    }catch(err){
        console.error('Error while checking user:', err);
        res.status(500).json({message:"An error occurred while checking the user"});

    }

});



// content posting endpoint ( again the use of jwt)
/*
So basically we will be using the jwt token for the authorization fo the user and then he will be able to post the content.
We will make a middleware checkToken that will check the availability of the token. (Imported from another file in controllers)

*/

//@ts-ignore ( Some ts error in req and res cycle)
app.post("/api/v1/content" ,checkToken, async (req,res) => {
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
    const tagIds: mongoose.Types.ObjectId[] = [];

    for (const title of tagTitles) {
        let tagDoc = await TagModel.findOne({ title });

        if (!tagDoc) {
            const newTag = new TagModel({ title });
            tagDoc = await newTag.save(); // ✅ Reassign to get _id
        }

        if (tagDoc) {
            tagIds.push(tagDoc._id);
        }
    }


    // Step 3: Create and save content
    const post = new ContentModel({
      link,
      type,
      title,
      description,
      //@ts-ignore
      userId: req.userId, // @ts-ignore as needed
      tags: tagIds,
    });

    await post.save();
    console.log("Post saved successfully");

    return res.status(201).json({ message: "Content saved successfully!" });
  } catch (error) {
    console.error("Error saving content:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// get on content
app.get("/api/v1/content", checkToken , async (req , res) => {
    //@ts-ignore
    const userId = req.userId;

    try{
       const content =  await ContentModel.find({userId: userId});  // this will be an array of objects.

       // Send the array of data to the user
       res.status(200).json({
        content
       })

    }catch(err){
        console.log(`Error in loading content: ${err}`);
        res.status(500).json({
            "message":"An error occurred while loading content"
        })
    }
});


//delete on content
app.delete("/api/v1/content",checkToken ,async (req, res) => {
    const {contentId} = req.body;

    if(!contentId){
        res.status(400).json({
            "message":"Content ID is required"
        })
    }else{
        try{
            const deletedContent = await ContentModel.findByIdAndDelete(contentId);

            if(!deletedContent){
                res.status(404).json({
                    "message":"Content not found"
                })
            }else{
                res.status(200).json({
                    "message":"Content deleted successfully"
                })
            }
        }catch(err){
            res.status(500).json({
                "message":"An error occurred while deleting content"
            })
        }
    }
});

// sharable
app.post("/api/v1/brain/share" ,checkToken ,async (req , res) => {  // There is some editing required in this code.
    const share = req.body.share;

    if(share){
        const foundLink = await LinkModel.find({
            //@ts-ignore
            userId:req.userId
        })

        if(foundLink){
            res.json({
                "message":"The sharable link already exists."
            })
        }
        else{

            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: random(10),
            });
        }
        
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId:req.userId
        })
    }

    res.json({
        "message":"Sharable Edited Successfully."
    })
});


// Getting the content of the shared link
app.get("/api/v1/brain/share:shareLink", async (req, res) => {
    try {
        const hash = req.params.shareLink;

        const links = await LinkModel.findOne({ hash: hash });

        if (!links) {
            res.status(411).json({
                "message": "Sorry Incorrect Input"
            });
            return; // Stop execution after sending the response
        }

        const content = await ContentModel.find({ userId: links.userId });
        const user = await UserModel.findOne({ _id: links.userId }); // This is important.

        if (!user) {
            res.json({
                "message": "User not found (Ideally should not happen)"
            });
            return; // Stop execution after sending the response
        }

        res.json({
            "user": user?.username,
            "content": content
        });
    } catch (err: any) {
        // Handle unexpected errors
        res.status(500).json({
            "message": "An error occurred",
            "error": err.message
        });
    }
});







// Call the database connection function and after that start the server.
db()
    .then(() => {
        // Start the server only after a successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });