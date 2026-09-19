import { Input } from "../ui/input";
import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";

import { toast } from "sonner";

function Login() {
    const [input, setinput] = useState({
            email:"",        
            password:"",
            role:"",
                })
        const navigate = useNavigate()
        
        const changeEventHandler = (e)=>{
            setinput({...input,[e.target.name]:e.target.value});
    }
const submitHandler = async (e)=>{
    e.preventDefault();
try {
        const res = await axios.post(`${USER_API_END_POINT}/register`,
            input, {
                 withCredentials:true
            })
            if(res.data.success){
                navigate("/")
                toast.success(res.data.message)
            }
    
} catch (error) {
  console.log("Login error:", error);

  toast.error(
    error.response?.data?.message || "Something went wrong"
  );
}   
}    


  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form  className="w-full max-w-md mt-10 border border-gray-200 rounded-lg p-8 shadow-sm" 
       onSubmit={submitHandler} >
          <h1 className="font-bold text-xl mb-6">Login</h1>

          <div className="mb-4">
                      <Label className="mb-2 block">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        placeholder="eg@gmail.com"
                      />
                    </div>

          <div className="mb-4">
                      <Label className="mb-2 block">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        placeholder="********"
                      />
                    </div>
            
            {/* radio buttons */}
                      <div className="flex items-center justify-between gap-6 my-5">
                        
                        <RadioGroup className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Input
                              type="radio"
                              name="role"
                              value="student"
                              checked={input.role === 'student'}
                              onChange={changeEventHandler}
                              className="cursor-pointer"
                            />
                            <Label>Student</Label>
                          </div>
            
                          <div className="flex items-center gap-2">
                            <Input
                              type="radio"
                              name="role"
                              value="recruiter"
                              checked={input.role === 'recruiter'}
                              onChange={changeEventHandler}
                              className="cursor-pointer"
                            />
                            <Label>Recruiter</Label>
                          </div>
                        </RadioGroup>


          </div>

          <Button type="submit" className="w-full my-4">
            Login
          </Button>

          <span className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Login;