import { useState, useEffect } from "react";
import { Alert } from "@mui/material";

const ErrorAlert = ({ error, setServerError }) => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (error) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setServerError("");
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  },[error]);

  return (
    showAlert && (
      <Alert variant="filled" sx={{ position: "absolute", bottom: 0, left: 0 }} severity="error">
        {error}
      </Alert>
    )
  );
};

export default ErrorAlert;