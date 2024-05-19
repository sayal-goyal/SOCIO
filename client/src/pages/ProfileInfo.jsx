import { Button, Stack, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/users";
import { isLoggedIn } from "../helpers/authHelper";
import ErrorAlert from "../components/others/ErrorAlert";
import { blueTheme } from "../components/theme/Button"

const ProfileInfo = () => {
    const navigate = useNavigate();
    const user = isLoggedIn();
    const [serverError, setServerError] = useState("");

    const [formData, setFormData] = useState({
        designation: "",
        location: "",
        biography: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await updateUser(user, formData);
        if (data.error) {
            setServerError(data.error);
        } else {
            navigate("/dashboard");
        }
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-sky-200 text-bottle-blue py-14 px-20 lg:py-24 lg:px-36">
            <div className="h-full max-h-[597px] w-full max-w-[1200px] shadow bg-white rounded-xl flex flex-1">
                <div className="flex flex-1 flex-col items-center w-fit p-10 sm:p-20 space-y-14">
                    <div className="flex flex-col items-center space-y-3 justify-center">
                        <div className="text-2xl lg:text-3xl font-semibold">
                            Tell Us more about You
                        </div>
                        <div className="grid grid-cols-12 gap-x-3 h-[5px]">
                            <hr className="col-span-7 h-full bg-bottle-blue rounded-full" />
                            <hr className="col-span-3 h-full bg-bottle-blue rounded-full" />
                            <hr className="col-span-2 h-full bg-bottle-blue rounded-full" />
                        </div>
                    </div>

                    <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
                        <TextField
                            id="designation"
                            name="designation"
                            label="Designation"
                            type="text"
                            required
                            fullWidth
                            onChange={handleChange}
                        />
                        <TextField
                            id="location"
                            name="location"
                            label="Location"
                            type="text"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            id="biography"
                            name="biography"
                            label="Write Something about You"
                            rows={3}
                            type="text"
                            multiline
                            required
                            onChange={handleChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    'scrollbar-width': 'none',
                                    overflow: 'auto'
                                },
                            }}
                        />
                        <ThemeProvider theme={blueTheme}>
                            <Stack gap={2} alignItems="center">
                                <Button variant="contained" type="submit" fullWidth
                                    sx={{ py: 1.5, px: 13.9, boxShadow: "none" }}>
                                    Submit
                                </Button>
                            </Stack>
                        </ThemeProvider>
                    </form>
                </div>

                <img className="max-w-[550px] flex-1 hidden b4:flex rounded-r-xl" src="/info.jpg" alt="" />
            </div>
            <ErrorAlert error={serverError} />
        </div >
    )
}

export default ProfileInfo;