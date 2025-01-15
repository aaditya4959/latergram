import { useRef } from "react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { useToast } from "../hooks/use-toast";
import { Card } from "../Components/ui/card";
import { User, Lock } from "lucide-react";
import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {userSignedIn} from "../Atoms/userSignedIn"
import { useRecoilState } from "recoil";

const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();  // For redirecting the pages.
  const [signedIn, setSignedIn] = useRecoilState(userSignedIn);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usernameRef.current?.value || !passwordRef.current?.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Signed in successfully",
    });

   
  };

  async function signin(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`,{
        username,
        password
    })

    if(response.status == 200){
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        setSignedIn(true); // This changes the state of the user to signed in the atom.
        navigate("/dashboard");
    }

    

    // redirect the user to the dashboard

    alert("Signed In Successfully");
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Sign In</h2>
          <p className="text-sm text-gray-500 mt-2">Welcome back</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Username"
                //@ts-ignore
                ref={usernameRef}
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Password"
                //@ts-ignore
                ref={passwordRef}
                className="pl-10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            onClick={signin}
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="/" className="text-gray-900 hover:underline font-medium">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Signin;