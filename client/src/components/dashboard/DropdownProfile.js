import React, { useRef, useEffect } from "react";
import UserAvatar from "../user/UserAvatar";
import { Link } from "react-router-dom";

const DropdownProfile = ({ username, handleLogout, profRef, setToogle }) => {
    const dropRef = useRef()
    useEffect(() => {
        const handleClickOutside = (e) => {
            if(e.target !== dropRef.current && e.target !== profRef.current) {
                setToogle(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [profRef, setToogle]);

    return (
        <div ref={dropRef} className="absolute flex flex-col top-[60px] right-0 bg-zinc-800 px-6 py-4 rounded-lg items-center space-y-3 text-zinc-300">
            <div className="flex flex-col items-center space-y-2">
                <UserAvatar width={40} height={40} username={username} />
                <div className="text-lg">{username}</div>
            </div>
            <div className="flex flex-col space-y-4 items-center">
                <hr className="w-full border-none h-[0.1px] bg-zinc-600" />

                <div className="flex flex-col">
                    <Link to={"/users/" + username} className="flex space-x-6 px-6 py-2 hover:bg-zinc-700 rounded-md items-center">
                        <img className="h-5 w-5" src="/icons/profile.svg" alt="" />
                        <div className="text-lg">Profile</div>
                    </Link>
                    <button onClick={handleLogout} className="flex space-x-6 px-6 py-2 hover:bg-red-500 rounded-md items-center">
                        <img className="h-5 w-5" src="/icons/logout.svg" alt="" />
                        <div className="text-lg">Logout</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DropdownProfile;