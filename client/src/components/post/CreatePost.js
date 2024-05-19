import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { GrayTheme } from "../theme/Button";

const CreatePost = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={GrayTheme}>
      <Stack gap={2} alignItems="center">
        <Button
          variant="outlined"
          onClick={() => navigate("/posts/create")}
          startIcon={<AddIcon />}
          sx={{
            color: "#fff", backgroundColor: "#27272A", py: 0.6, px: 3, borderColor: "#918E95", '&:hover': {
              borderColor: "#B9B5BD",
            }, fontSize: 16
          }}>
          New Post
        </Button>
      </Stack>
    </ThemeProvider>
  );
};

export default CreatePost;
