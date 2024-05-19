import React from "react";
import Moment from "react-moment";
import UserAvatar from "../user/UserAvatar";
import { Link } from "react-router-dom";

const ContentDetails = ({ username, createdAt, edited, preview }) => {
  return (
    <div className="w-full flex space-x-3 items-center">
      <UserAvatar width={30} height={30} username={username} />
      <div className="w-full flex justify-between items-center space-x-4">
        <Link className="text-zinc-100 hover:underline"
          onClick={(e) => {
            e.stopPropagation();
          }} to={"/users/" + username} >
          {username}
        </Link>
        {!preview && (
          <div className="text-sm text-zinc-300">
            <Moment fromNow>{createdAt}</Moment> {edited && <>(Edited)</>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;