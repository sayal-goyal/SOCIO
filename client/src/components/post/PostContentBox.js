import React from "react";
import "react-router-dom";
import { useNavigate } from "react-router-dom";

const PostContentBox = (props) => {
  const { clickable, post, editing } = props;
  const navigate = useNavigate();

  return (
    <>
      {clickable && !editing ? (
        <div className="cursor-pointer"
          onClick={() => navigate("/posts/" + post._id)} >
          {props.children}
        </div>
      ) : (
        <div className="cursor-pointer">
          {props.children}
        </div>
      )}
    </>
  );
};

export default PostContentBox;