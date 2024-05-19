import React from "react";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

const UserEntry = ({ username }) => {
  return (
    <div className="flex justify-between text-zinc-100 items-center" key={username}>
      <div className="flex items-center space-x-3">
        <UserAvatar width={30} height={30} username={username} />
        <div>{username}</div>
      </div>
      <Link className="text-sm hover:text-zinc-300" to={"/users/" + username}>View</Link>
    </div>
  );
};

export default UserEntry;
