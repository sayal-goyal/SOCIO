import { ThemeProvider, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNews } from "../api/news";
import { GrayTheme } from "../components/theme/Button";
import ErrorAlert from "../components/others/ErrorAlert";
import { isLoggedIn } from "../helpers/authHelper";
import Loading from "../components/others/Loading";
import AddBoxIcon from '@mui/icons-material/AddBox';

const AddNews = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        headline: "",
        short_description: "",
        link: ""
    });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const handleChange = (e) => {
        setFormData((previous) => ({
            ...previous,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(formData)
        setLoading(true);
        const data = await createNews(formData, isLoggedIn());
        console.log(data)
        setLoading(false);
        if (data && data.error) {
            setServerError(data.error);
            setLoading(false);
        } else {
            navigate("/news");
        }
    };


    return (
        <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-4">
                <AddBoxIcon sx={{ color: "white", fontSize: 44 }} />
                <div className="text-zinc-100 text-3xl mt-1">Add News</div>
            </div>
            {loading ? <Loading /> :
                (<div className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-col space-y-2">
                            <div className="text-xl text-zinc-300">News Headline</div>
                            <ThemeProvider theme={GrayTheme}>
                                <Stack gap={1} alignItems="center">
                                    <TextField
                                        fullWidth
                                        name="headline"
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
                                        required
                                        multiline
                                        minRows={2}
                                    />
                                </Stack>
                            </ThemeProvider>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="text-xl text-zinc-300">News Description</div>
                            <ThemeProvider theme={GrayTheme}>
                                <Stack gap={1} alignItems="center">
                                    <TextField
                                        fullWidth
                                        name="short_description"
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
                                        required
                                        multiline
                                        minRows={4}
                                    />
                                </Stack>
                            </ThemeProvider>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="text-xl text-zinc-300">News Website Link</div>
                            <ThemeProvider theme={GrayTheme}>
                                <Stack gap={1} alignItems="center">
                                    <TextField
                                        fullWidth
                                        name="link"
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
                                        required
                                        multiline
                                    />
                                </Stack>
                            </ThemeProvider>
                        </div>
                    </div>
                    <ErrorAlert error={serverError} />
                    <div className="flex justify-end space-x-5">
                        <Button variant="contained" color="error" size="large" sx={{ px: 8 }} href="/news" >Cancel</Button>
                        <Button variant="contained" color="success" size="large" sx={{ px: 8 }} onClick={handleSubmit}>Save</Button>
                    </div>
                </div>)}
        </div>
    )
}

export default AddNews;