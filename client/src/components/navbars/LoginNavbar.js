import { Button } from "@mui/material";
import React from "react";
import "react-icons/ai";
import "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";


const LoginNavbar = () => {
    const navigate = useNavigate();

    return (
        <div className="sticky top-0 w-full z-20 text-white bg-zinc-900">
            <div className="flex justify-between items-center w-full max-w-[1440px] h-20 mx-auto px-4">
                <Link to="/" className="text-3xl tracking-wider text-white cursor-pointer">SOCIO</Link>
                <div className="flex space-x-8 text-lg text-white font-regular">
                    <ul className="flex space-x-8 items-center">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/support">Support</Link>
                        </li>
                    </ul>
                    <Button variant="contained" color="success" size="medium" onClick={()=>{navigate('/login')}}>
                        Login
                    </Button>
                    <Button variant="contained" size="medium" onClick={()=>{navigate('/signup')}}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LoginNavbar;