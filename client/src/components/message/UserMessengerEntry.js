import React from "react";
import { MenuItem } from "@mui/material";
import UserAvatar from "../user/UserAvatar";
import moment from "moment";

const UserMessengerEntry = (props) => {
  const recipient = props.conversation.recipient;
  const username = recipient.username;
  const selected =
    props.conservant && props.conservant.username === recipient.username;

  const handleClick = () => {
    props.setConservant(recipient);
  };

  return (
    <MenuItem
      onClick={handleClick}
      sx={{ padding: 3, gap: 2 }}
      divider
      disableGutters
      selected={selected}
      style={{ borderBottom: '0.5px solid #3F3F46' }}
    >
      <UserAvatar height={45} width={45} username={username} />
      <div className="flex flex-col">
        <div className="text-zinc-100">{username}</div>
        <div className="text-zinc-300">{moment(props.conversation.lastMessageAt).fromNow()}</div>
      </div>
    </MenuItem>
  );
};

export default UserMessengerEntry;
