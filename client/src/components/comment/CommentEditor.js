import { ThemeProvider, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComment } from "../../api/posts";
import { isLoggedIn } from "../../helpers/authHelper";
import ErrorAlert from "../others/ErrorAlert";
import { GrayTheme } from "../theme/Button";

const CommentEditor = ({ label, comment, addComment, setReplying, view }) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      parentId: comment && comment._id,
    };

    setLoading(true);
    const data = await createComment(body, params, isLoggedIn());
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      formData.content = "";
      setReplying && setReplying(false);
      addComment(data);
    }
  };

  const handleFocus = (e) => {
    !isLoggedIn() && navigate("/login");
  };

  return (
    <div className={view ? "flex flex-col bg-zinc-900 pt-4 rounded-lg text-zinc-100 space-y-3" : "flex flex-col p-6 bg-zinc-900 rounded-lg text-zinc-100 space-y-3"}>
      <div className="text-2xl">
        {comment ? <>Reply</> : <>Comment</>}
      </div>

      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={GrayTheme}>
          <Stack gap={2} alignItems="center">
            <TextField
              multiline
              fullWidth
              label={label}
              rows={5}
              required
              name="content"
              sx={{
                backgroundColor: "#27272A",
                '& .MuiInputBase-input': {
                  color: '#D4D4D8',
                  'scrollbarWidth': 'none',
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
              onFocus={handleFocus}
              value={formData.content}
            />
            <ErrorAlert error={error} sx={{ my: 4 }} />
            <Button
              variant="outlined"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3, borderColor: "#918E95",
                '&:hover': {
                  borderColor: '#B9B5BD'
                }
              }}>
              {loading ? <div>Submitting</div> : <div>Submit</div>}
            </Button>
          </Stack>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default CommentEditor;
