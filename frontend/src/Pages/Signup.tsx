import { useRef, useState } from "react";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { useToast } from "../hooks/use-toast";
import { Card } from "../Components/ui/card";
import { User, Lock } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/config";

const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!usernameRef.current || !passwordRef.current) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Account created successfully",
    });
  };


  // signin function for backend request
  async function signup(){
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    // sending the request to backend
    await axios.post(`${BACKEND_URL}/api/v1/signup`,{
        username,
        password
    })
    alert("You Have Signed Up!");
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
              
                type="text"
                placeholder="Username"
                // value={usernameRef.current}
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
                // value={passwordRef.current}
                //@ts-ignore
                ref={passwordRef}
                className="pl-10"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            onClick={signup}
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="#" className="text-gray-900 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </Card>
    </div>
  );
};

export default Signup;