import { ThemeProvider, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { GrayTheme } from "../theme/Button";

const ContentUpdateEditor = (props) => {
  const [content, setContent] = useState(props.originalContent);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;
    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(e);
    }
  };

  return (
    <form className={props.view ? "mt-2" : "mb-3 mt-4"} onSubmit={handleSubmit}>
      <ThemeProvider theme={GrayTheme}>
        <Stack gap={2} alignItems="center">
          <TextField
            value={content}
            fullWidth
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
            error={error.length !== 0}
            helperText={error}
            multiline
          />

          <Button color="lightGray"
            type="submit"
            variant="outlined" fullWidth
            sx={{ color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3 }}>
            Update
          </Button>
        </Stack>
      </ThemeProvider>
    </form>
  );
};

export default ContentUpdateEditor;
