import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const LikeBox = (props) => {
  const { likeCount, onLike } = props;
  const [liked, setLiked] = useState(props.liked);

  const handleLike = (e) => {
      const newLikedValue = !liked;
      setLiked(newLikedValue);
      onLike(newLikedValue);
  };

  return (
    <div className="flex items-center">
      <IconButton onClick={handleLike}>
        {liked ? (
            <ThumbUpAltIcon sx={{ color: "blue", fontSize: 26 }} />
        ) : (
          <ThumbUpOffAltIcon sx={{ color: "white", fontSize: 26 }} />
        )}
      </IconButton>
      <div className="text-lg text-zinc-100">{likeCount}</div>
    </div>
  );
};

export default LikeBox;