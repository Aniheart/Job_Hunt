import { Input } from "../ui/input";
import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
function Signup() {
    const [input, setinput] = useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    })
    const navigate = useNavigate()
    
    const changeEventHandler = (e)=>{
        setinput({...input,[e.target.name]:e.target.value});
}
    const changeFileHandler = (e)=>{
        setinput({...input, file:e.target.files?.[0]});
}

const submitHandler = async (e)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("fullname", input.fullname)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if(input.file){
        formData.append("file", input.file)
    }
try {
        const res = await axios.post(`${USER_API_END_POINT}/register`,
            formData, {
                 withCredentials:true
            })
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message)
            }
    
} 
catch (error) {
  console.log(error.response?.data);
  toast.error(error.response?.data?.message || "Something went wrong");
}    
}
  return (
    <div>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form  className="w-full max-w-md mt-10 border border-gray-200 rounded-lg p-8 shadow-sm"
         onSubmit={submitHandler}>
          <h1 className="font-bold text-xl mb-6">Sign Up</h1>

          <div className="mb-4">
            <Label className="mb-2 block">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Aniket"
            />
          </div>

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
            <Label className="mb-2 block">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="0123456789"
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

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>

          </div>

          <Button type="submit" className="w-full my-4">
            Signup
          </Button>

          <span className="text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;