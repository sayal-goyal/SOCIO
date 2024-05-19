import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import UserLikeModal from "./UserLikeModal";

const UserLikePreview = ({ postId, userLikePreview }) => {
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setOpen(true);
  };

  let userLikes;
  if (userLikePreview) {
    userLikes = userLikePreview.slice(0, 3);
  }

  return (
    userLikes && (
      <>
        <IconButton sx={{ ":hover": { backgroundColor: "#3F3F46" } }} onClick={handleClick}>
          <ErrorIcon sx={{ color: "white", fontSize: 26 }} />
        </IconButton>
        {open && (
          <UserLikeModal open={open} setOpen={setOpen} postId={postId} />
        )}
      </>
    )
  );
};

export default UserLikePreview;