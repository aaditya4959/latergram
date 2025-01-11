import express from "express";  // This statement is possible due to typescript.
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {UserModel} from "./models/users";
import bcrypt from "bcrypt";
import {db} from "./Controller/dbConnection"
import dotenv from "dotenv"
import checkToken from "./Controller/checkToken";
import {ContentModel} from "./models/contents";





const PORT = process.env.PORT || 8080;

const app = express();



app.use(bodyParser.json());
app.use(express.json());


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
                        token: token
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


app.post("/api/v1/content" ,checkToken, async (req,res) => {
    // first of all verify that the user is signed in
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    const post = new ContentModel({
        link: link,
        type: type,
        title: title,
        //@ts-ignore
        userId: req.userId,  // Here again some error is being shown up by the typescript.
        tags:[]

    })

    try {
        await post.save();
        console.log("Post saved successfully");
    } catch (saveErr) {
        console.error("Error while saving Post:", saveErr);
    }
    

    // Sending a success response
    res.status(201).json({
        message: 'Brain Created successfully!'
    });
    

});




// get on content
app.get("/api/v1/content", checkToken , async (req , res) => {
    //@ts-ignore
    const userId = req.userId;

    try{
       const response =  await ContentModel.find({userId: userId});  // this will be an array of objects.

       // Send the array of data to the user
       res.status(200).json({
        "message":"Content Loaded Successfully",
        "data":response
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
app.post("/api/v1/brain/share" ,checkToken ,async (req , res) => {

});


// Getting the content of the shared link
app.get("/api/v1/brain/share:link",checkToken ,async (req , res) => {

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
