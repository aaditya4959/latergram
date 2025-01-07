import express from "express";  // This statement is possible due to typescript.
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {UserModel} from "./models/users";
import bcrypt from "bcrypt";
import {db} from "./Controller/dbConnection"





const PORT = process.env.PORT || 8080;

const app = express();



app.use(bodyParser.json());


// 


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


// Signin request (User will be assigned the jwt in this step and will be stored in the browser only)
app.post("api/v1/signin", async (req , res) =>{

});



// content posting endpoint ( again the use of jwt)
app.post("api/v1/content" , async (req,res) => {

});




// get on content
app.get("api/v1/content", async (req , res) => {

});


//delete on content
app.delete("api/v1/content:id", async (req, res) => {

});

// sharable
app.post("api/v1/brain/share" , async (req , res) => {

});


// Getting the content of the shared link
app.get("api/v1/brain/share:link", async (req , res) => {

});






// Call the database connection function and after that start the server.
db()
    .then(() => {
        console.log("Database connected successfully. Starting server...");

        // Start the server only after a successful DB connection
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });
