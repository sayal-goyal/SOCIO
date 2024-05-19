import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { isLength, isEmail, contains } from "validator";
import { signup } from "../api/users";
import { loginUser } from "../helpers/authHelper";
import ErrorAlert from "../components/others/ErrorAlert";
import { blueTheme } from "../components/theme/Button"
import { ReactComponent as AddIcon } from '../images/add-user.svg';

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/info");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Must be between 6 and 30 characters long";
    }

    if (contains(formData.username, " ")) {
      errors.username = "Must contain only valid characters";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Must be at least 8 characters long";
    }

    if (!isEmail(formData.email)) {
      errors.email = "Must be a valid email address";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-violet-50 text-bottle-blue py-14 px-20 lg:py-24 lg:px-36">
      <div className=" flex justify-center flex-1 text-center h-full max-h-[597px] w-full max-w-[1200px] shadow bg-white rounded-xl">
        <div className="flex flex-col items-center w-full xl:max-w-[50%] p-16 space-y-8">
          <div className="flex flex-col items-center space-y-3 justify-center">
            <Link to="/" className="text-2xl lg:text-3xl font-semibold">
              Sign up for Socio
            </Link>
            <div className="grid grid-cols-12 gap-x-3 h-[5px]">
              <hr className="col-span-7 h-full bg-bottle-blue rounded-full" />
              <hr className="col-span-3 h-full bg-bottle-blue rounded-full" />
              <hr className="col-span-2 h-full bg-bottle-blue rounded-full" />
            </div>
          </div>

          <div>Connect, Share, Thrive - Welcome to a vibrant community where friendships flourish and ideas ignite!</div>

          <div className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                required
                
                onChange={handleChange}
                error={errors.username !== undefined}
                helperText={errors.username}
              />
              <TextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                required
                onChange={handleChange}
                error={errors.email !== undefined}
                helperText={errors.email}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type="password"
                required
                onChange={handleChange}
                error={errors.password !== undefined}
                helperText={errors.password}
              />
              <ThemeProvider theme={blueTheme}>
                <Stack gap={2} alignItems="center">
                  <Button variant="contained" type="submit"
                    sx={{
                      textTransform: 'none', py: 1.5, px: 13.9, boxShadow: "none",
                      '& .MuiButton-startIcon': { width: '24px', height: '24px', marginRight: "12px" },
                    }}
                    startIcon={<AddIcon />}>
                    Sign Up
                  </Button>
                </Stack>
              </ThemeProvider>
            </form>
            <Link className="self-center font-noto-sans text-gray-600 hover:underline" to="/login">Already a User?</Link>
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

export default SignupView;