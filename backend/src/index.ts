import express from "express";
import bodyParser from "body-parser";
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






app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})

