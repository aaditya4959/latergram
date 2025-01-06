import express from "express";  // This statement is possible due to typescript.
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import {UserModel} from "./models/users";



const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json())


app.post("/api/v1/signup", async (req,res) => {
    console.log("Signup request received");
    const {username, password} = req.body;

    
    
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






app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

