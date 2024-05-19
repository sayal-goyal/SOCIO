import {
  Alert,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import {
  ThemeProvider
} from '@mui/material/styles';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/users";
import ErrorAlert from "../components/others/ErrorAlert";
import { loginUser } from "../helpers/authHelper";
import { ReactComponent as GoogleIcon } from '../images/google.svg';
import { ReactComponent as InIcon } from '../images/sign-in.svg';
import { blueTheme } from "../components/theme/Button"

const LoginView = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await login(formData);
    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-violet-50 text-bottle-blue py-14 px-20 lg:py-24 lg:px-36">
      <div className="h-full max-h-[597px] w-full max-w-[1200px] shadow bg-white rounded-xl flex justify-center flex-1">
        <div className="flex flex-col items-center w-full xl:max-w-[50%] p-16 space-y-9">
          <div className="flex flex-col items-center space-y-8">
            <Link to="/" className="text-2xl lg:text-3xl font-semibold">
              Welcome Back!
            </Link>
            <div className="flex flex-col items-center space-y-14">
              <ThemeProvider theme={blueTheme}>
                <Stack gap={2} alignItems="center">
                  <Button variant="outlined"
                    sx={{
                      textTransform: 'none', py: 1.2, px: 7, boxShadow: "none", color: "black", borderColor: "#9CA3AF",
                      '& .MuiButton-startIcon': { width: '20px', height: '20px', marginRight: "18px" },
                    }}
                    startIcon={<GoogleIcon />}>
                    Sign In with Google
                  </Button>
                </Stack>
              </ThemeProvider>
              <div className="flex w-full transform translate-y-1/2 items-center">
                <span className="w-full h-[0.5px] bg-gray-600"></span>
                <span className="leading-none px-2 text-sm text-gray-600 tracking-wide font-medium bg-white min-w-fit">
                  Or sign in with e-mail
                </span>
                <span className="w-full h-[0.5px] bg-gray-600"></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                required
                onChange={handleChange}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                onChange={handleChange}
              />
              <ThemeProvider theme={blueTheme}>
                <Stack gap={2} alignItems="center">
                  <Button variant="contained" type="submit"
                    sx={{
                      textTransform: 'none', py: 1.5, px: 13.9, boxShadow: "none",
                      '& .MuiButton-startIcon': { width: '24px', height: '24px', marginRight: "12px" },
                    }}
                    startIcon={<InIcon />}>
                    Sign In
                  </Button>
                </Stack>
              </ThemeProvider>
            </form>
            <Link className="self-center font-noto-sans text-gray-600 hover:underline" to="/signup">I am a New User?</Link>
          </div>
        </div>

        <div className="flex-1 bg-violet-100 hidden xl:flex p-12 rounded-r-xl">
          <div className="w-full bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
          </div>
        </div>
      </div>
      <ErrorAlert error={serverError} setServerError={setServerError}/>
    </div >
  );
};

export default LoginView;
