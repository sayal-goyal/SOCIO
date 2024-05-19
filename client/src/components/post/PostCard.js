import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { deletePost, likePost, unlikePost, updatePost } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import ContentDetails from "../others/ContentDetails";
import LikeBox from "./LikeBox";
import PostContentBox from "./PostContentBox";
import ContentUpdateEditor from "../others/ContentUpdateEditor";
import Markdown from "../others/Markdown";
import UserLikePreview from "./UserLikePreview";

const PostCard = (props) => {
  const { preview, removePost } = props;
  let postData = props.post;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = isLoggedIn();
  const isAuthor = user && user.username === postData.poster.username;

  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [post, setPost] = useState(postData);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  let maxHeight = null;
  if (preview === "primary") {
    maxHeight = 250;
  }

  const handleDeletePost = async (e) => {
    e.stopPropagation();

    if (!confirm) {
      setConfirm(true);
    } else {
      setLoading(true);
      await deletePost(post._id, isLoggedIn());
      setLoading(false);
      if (preview) {
        removePost(post);
      } else {
        navigate("/");
      }
    }
  };

  const handleEditPost = async (e) => {
    e.stopPropagation();

    setEditing(!editing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    await updatePost(post._id, isLoggedIn(), { content });
    setPost({ ...post, content, edited: true });
    setEditing(false);
  };

  const handleLike = async (liked) => {
    if (liked) {
      setLikeCount(likeCount + 1);
      await likePost(post._id, user);
    } else {
      setLikeCount(likeCount - 1);
      await unlikePost(post._id, user);
    }
  };

  return (
    <div className="w-full px-6 pb-4 pt-6 bg-zinc-900 rounded-lg">
      <PostContentBox clickable={preview} post={post} editing={editing}>
        <ContentDetails
          username={post.poster.username}
          createdAt={post.createdAt}
          edited={post.edited}
          preview={preview === "secondary"}
        />

        <div className="text-lg text-zinc-100 mt-4 mb-3">
          <div className={preview === "secondary" ? "line-clamp-2" : ""}>
            {post.title}
          </div>
        </div>

        {preview !== "secondary" && <img className="rounded-md object-fill h-96 w-full mt-3" src="/R.jpeg" alt="" />}

        {preview !== "secondary" &&
          (editing ? (
            <ContentUpdateEditor
              handleSubmit={handleSubmit}
              originalContent={post.content}
            />
          ) : (
            <div className="mb-2 mt-4">
              <Markdown content={post.content} />
            </div>
          ))}

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <MapsUgcIcon sx={{ color: "white", fontSize: 24 }} />
              <div className="text-lg text-zinc-100">
                {post.commentCount}
              </div>
            </div>

            <LikeBox
              likeCount={likeCount}
              liked={post.liked}
              onLike={handleLike}
            />
          </div>
          {preview === "secondary" &&
            <UserLikePreview
              postId={post._id}
              userLikePreview={post.userLikePreview}
            />}
          {user &&
            (isAuthor || user.isAdmin) &&
            preview !== "secondary" && (
              <div className="flex space-x-2">
                <IconButton disabled={loading} onClick={handleEditPost} >
                  {editing ? (
                    <CancelIcon sx={{ color: "white", fontSize: 24 }} />
                  ) : (
                    <EditIcon sx={{ color: "white", fontSize: 24 }} />
                  )}
                </IconButton>
                <IconButton disabled={loading} onClick={handleDeletePost} >
                  {confirm ? (
                    <CheckCircleIcon sx={{ color: "red", fontSize: 24 }} />
                  ) : (
                    <DeleteIcon sx={{ color: "red", fontSize: 24 }} />
                  )}
                </IconButton>
              </div>
            )}
        </div>
      </PostContentBox>
    </div>
  );
};

export default PostCard;