import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import Moment from "react-moment";
import { isLoggedIn } from "../../helpers/authHelper";
import CommentEditor from "./CommentEditor";
import ContentDetails from "../others/ContentDetails";
import { deleteComment, updateComment } from "../../api/posts";
import ContentUpdateEditor from "../others/ContentUpdateEditor";
import Markdown from "../others/Markdown";

const Comment = (props) => {
  const theme = useTheme();
  const { depth, addComment, removeComment, editComment } = props;
  const commentData = props.comment;
  const [minimised, setMinimised] = useState(depth % 4 === 3);
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [comment, setComment] = useState(commentData);
  const user = isLoggedIn();
  const isAuthor = user && user.userId === comment.commenter._id;
  const navigate = useNavigate();

  const handleSetReplying = () => {
    if (isLoggedIn()) {
      setReplying(!replying);
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    await updateComment(comment._id, user, { content });
    const newCommentData = { ...comment, content, edited: true };
    setComment(newCommentData);
    editComment(newCommentData);
    setEditing(false);
  };

  const handleDelete = async () => {
    await deleteComment(comment._id, user);
    removeComment(comment);
  };

  let style = {
    backgroundColor: theme.palette.grey[100],
    borderRadius: 1.5,
    mb: theme.spacing(2),
    padding: theme.spacing(0),
  };

  if (depth % 2 === 1) {
    style.backgroundColor = "white";
  }

  return (
    <div className={props.view ? "flex flex-col pl-2 pt-3 bg-zinc-900 rounded-lg space-y-3" : "flex flex-col p-6 bg-zinc-900 rounded-lg space-y-3"}>
      {props.profile ? (
        <div className="flex flex-col">
          <Link className="text-xl text-zinc-100" to={"/posts/" + comment.post._id}>
            {comment.post.title}
          </Link>
          <div className="text-sm text-zinc-300">
            <Moment fromNow>{comment.createdAt}</Moment>{" "}
            {comment.edited && <>(Edited)</>}
          </div>
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <ContentDetails
              username={comment.commenter.username}
              createdAt={comment.createdAt}
              edited={comment.edited}
            />
            <IconButton onClick={() => setMinimised(!minimised)} >
              {minimised ? (
                <AddIcon sx={{ color: "white", fontSize: 24 }} />
              ) : (
                <RemoveIcon sx={{ color: "white", fontSize: 24 }} />
              )}
            </IconButton>
          </div>

          {!minimised && (
            <div className="flex">
              <IconButton
                onClick={handleSetReplying}>
                {!replying ? (
                  <ReplyIcon sx={{ color: "green", fontSize: 24 }} />
                ) : (
                  <CancelIcon sx={{ color: "blue", fontSize: 24 }} />
                )}
              </IconButton>
              {user && (isAuthor || user.isAdmin) && (
                <div className="flex">
                  <IconButton
                    onClick={() => setEditing(!editing)}>
                    {editing ? (
                      <CancelIcon sx={{ color: "blue", fontSize: 24 }} />
                    ) : (
                      <EditIcon sx={{ color: "white", fontSize: 24 }} />
                    )}
                  </IconButton>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon sx={{ color: "red", fontSize: 24 }} />
                  </IconButton>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!minimised && (
        <div className="overflow-x-auto scrollbar-hidden">
          {!editing ? (
            <Markdown content={comment.content} />
          ) : (
            <ContentUpdateEditor
              handleSubmit={handleSubmit}
              originalContent={comment.content}
              view="commentpage"
            />
          )}

          {replying && !minimised && (
              <CommentEditor
                comment={comment}
                addComment={addComment}
                setReplying={setReplying}
                label="What are your thoughts on this comment?"
                view="reply"
              />
          )}
          {comment.children && (
            <div className="flex flex-col space-y-3">
              {comment.children.map((reply, i) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  depth={depth + 1}
                  addComment={addComment}
                  removeComment={removeComment}
                  editComment={editComment}
                  view="reply"
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Comment;
