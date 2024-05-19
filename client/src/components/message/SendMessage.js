import React, { useState } from "react";
import { Button, TextField } from "@mui/material";

const SendMessage = (props) => {
  const [content, setContent] = useState("");

  const handleSendMessage = () => {
    props.onSendMessage(content);
    setContent("");
  };

  return (
    <div className="flex space-x-3 p-5">
      <TextField
        onChange={(e) => setContent(e.target.value)}
        label="Send a message"
        fullWidth
        value={content}
        sx={{
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
        size="small"
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === "Enter" && content.length > 0) {
            handleSendMessage();
          }
        }}
      />
      <Button variant={content.length === 0 ? "outlined" : "contained"} color="success" onClick={handleSendMessage} disabled={content.length === 0} sx={content.length === 0 ? {
        '&:disabled': {
          color: "white",
          backgroundColor: "#27272A"}} : {}}>
        Send
      </Button>
    </div>
  );
};

export default SendMessage;
