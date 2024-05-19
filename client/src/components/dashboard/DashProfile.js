import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import WorkIcon from '@mui/icons-material/Work';
import UserAvatar from "../user/UserAvatar";
import { isLoggedIn } from "../../helpers/authHelper";
import { getUser } from "../../api/users";
import Loading from "../others/Loading";

const DashProfile = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState(null);
    const currentUser = isLoggedIn();
    const fetchUser = async () => {
        setLoading(true);
        const data = await getUser({id:currentUser.username});
        setLoading(false);
        if (data.error) {
            setError(data.error);
        } else {
            setUser(data.user);
        }
    };

    useEffect(() => {
        fetchUser()
    }, [location]);

    return (
        <div className="flex flex-col w-full px-6 py-8 bg-zinc-900 rounded-lg space-y-5">
            {user ? (loading ? <Loading /> : (<div className="flex flex-col space-y-5">
                <div className="flex space-x-5 items-center px-1">
                    <UserAvatar height={60} width={60} />
                    <div className="flex flex-col text-zinc-100 space-y-1">
                        <div className="text-xl font-semibold">{user.username}</div>
                        <div className="text-zinc-300">0 friends</div>
                    </div>
                </div>
                <hr className="border-[1px] p-0 border-zinc-600" />
                <div className="flex flex-col space-y-3 px-1 text-zinc-100">
                    <div className="flex space-x-5">
                        <PlaceIcon sx={{ color: "white", fontSize: 30 }} />
                        <div className="text-lg">{user.location}</div>
                    </div>
                    <div className="flex  space-x-5">
                        <WorkIcon sx={{ color: "white", fontSize: 30 }} />
                        <div className="text-lg">{user.designation}</div>
                    </div>
                </div>
                <hr className="border-[1px] p-0 border-zinc-600" />
                <div className="max-h-24 text-zinc-100 px-1 overflow-hidden">
                    <div className="line-clamp-4">{user.biography}</div>
                </div>
            </div>)) : <Loading/>}
        </div>
    )
}

export default DashProfile;