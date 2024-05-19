import { CircularProgress } from "@mui/material";
import React from "react";

const Loading = ({ label }) => {
  return (
    <div className="flex flex-col items-center">
      <CircularProgress size={48} sx={{ mb: 2, mt:4, color:"#ffffff" }} />
      <div className="text-zinc-100 mb-4">
        {label || "Loading the content"}
      </div>
    </div>
  );
};

export default Loading;
