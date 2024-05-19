import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Button, Stack, TextField } from "@mui/material";
import { createPost } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import ErrorAlert from "../others/ErrorAlert";
import { GrayTheme } from "../theme/Button";
import UserAvatar from "../user/UserAvatar";

const PostEditor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});
  const user = isLoggedIn();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const errors = validate();
    setErrors(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const data = await createPost(formData, isLoggedIn());
    setLoading(false);
    if (data && data.error) {
      setServerError(data.error);
    } else {
      navigate("/posts/" + data._id);
    }
  };

  const validate = () => {
    const errors = {};
    return errors;
  };

  return (
    <div className="flex flex-col p-6 bg-zinc-900 rounded-lg space-y-6">
      {user && (
        <div className="flex items-center space-x-4">
          <UserAvatar width={60} height={60} username={user.username} />
          <div className="flex flex-col">
            <div className="text-2xl text-zinc-100">What would you like to post today</div>
            <div className="text-zinc-300">@{user.username}</div>
          </div>
        </div>
      )}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <ThemeProvider theme={GrayTheme}>
          <Stack gap={2} alignItems="center">
            <TextField
              fullWidth
              label="Title"
              required
              name="title"
              sx={{
                backgroundColor: "#27272A",
                '& .MuiInputBase-input': {
                  color: '#D4D4D8',
                  'scrollbar-width': 'none',
                  overflow: 'auto'
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B9B5BD',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#918E95',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4D4D8',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B9B5BD',
                },
              }}
              onChange={handleChange}
              error={errors.title !== undefined}
              helperText={errors.title}
            />
            <TextField
              fullWidth
              label="Content"
              multiline
              rows={10}
              name="content"
              sx={{
                backgroundColor: "#27272A",
                '& .MuiInputBase-input': {
                  color: '#D4D4D8',
                  'scrollbar-width': 'none',
                  overflow: 'auto'
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B9B5BD',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#918E95',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4D4D8',
                },
                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#B9B5BD',
                },
              }}
              onChange={handleChange}
              error={errors.content !== undefined}
              helperText={errors.content}
              required
            />
            <ErrorAlert error={serverError} />
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                color: "#fff", backgroundColor: "#27272A", py: 0.8, px: 3, borderColor: "#918E95", '&:hover': {
                  borderColor: "#B9B5BD",
                }, fontSize: 18
              }}>
              {loading ? <>Submitting</> : <>Submit</>}
            </Button>
          </Stack>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default PostEditor;
