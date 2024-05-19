import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getRandomUsers } from "../../api/users";
import Loading from "../others/Loading";
import UserEntry from "./UserEntry";

const FindUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getRandomUsers({ size: 5 });
    setLoading(false);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <div className="w-full space-y-3 bg-zinc-900 rounded-lg p-6">
      <div className="flex justify-between px-1">
        <div className="flex space-x-3 items-center">
          <AccountCircleIcon sx={{ color: "white", fontSize: 28 }} />
          <div className="text-lg text-zinc-100">Find Others</div>
        </div>
        <IconButton sx={{ padding: 0 }} disabled={loading} onClick={handleClick}>
          <RefreshIcon sx={{ color: "white", fontSize: 24 }} />
        </IconButton>
      </div>

      <div className="flex flex-col space-y-5">
        <hr className="border-[1px] p-0 border-zinc-600" />
        <div className="flex flex-col space-y-5 px-1">
          {loading ? (
            <Loading />
          ) : (
            users &&
            users.map((user) => (
              <UserEntry username={user.username} key={user.username} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FindUsers;