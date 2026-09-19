import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { LogOut, User2 } from "lucide-react";

function Navbar() {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">

        
          <Link to="/">
          <div>
          <h1 className="text-2xl font-bold">
            Jobs<span className="text-[#f83002]">Portal</span>
          </h1>
        </div>
          </Link>
          

        <div className="flex items-center gap-12">

          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          {
            !user ? (
              <div>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="ml-2 bg-[#6a38c2] hover:bg-[#2f0a6f]">Sign Up</Button></Link>
              </div>
            ) : (
              <div>

                {/* for profile picture and bio */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                  </PopoverTrigger>

                  <PopoverContent className="w-80">

                    <div className="flex gap-4 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                      </Avatar>

                      <div>
                        <h4 className="font-medium">
                          Aniket MernStack
                        </h4>

                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolar sit amet.
                        </p>
                      </div>
                    </div>
                    {/* for profile picture and bio */}

                    {/* for logout and profile view */}
                    <div className="flex flex-col m-2 text-gray-600">

                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">View Profile</Button>
                      </div>

                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link">Logout</Button>
                      </div>

                    </div>
                    {/* for logout and profile view */}

                  </PopoverContent>
                </Popover>

              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default Navbar;