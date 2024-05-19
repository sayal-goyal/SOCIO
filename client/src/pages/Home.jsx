import React, {useEffect} from "react";
import { isLoggedIn } from "../helpers/authHelper";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const user = isLoggedIn();
    const navigate = useNavigate();
    useEffect(() => {
      if(user) {
        navigate('/dashboard')
      }
    }, [])
    
    return (
        <div className="w-full">
            
        </div>
    )
}

export default Home;