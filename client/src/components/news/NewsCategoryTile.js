import React from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, Button, Stack } from "@mui/material";
import { GrayTheme } from "../theme/Button";

const NewsCategoryTile = ({ type, img }) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col text-center w-full space-y-2">
            <img className="w-full h-56 object-fill rounded-md" src={img} alt="" />
            <ThemeProvider theme={GrayTheme}>
                <Stack gap={1} alignItems="center">
                    <Button color="lightGray"
                        type="submit"
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate("/news/" + type)}
                        sx={{ color: "#fff", backgroundColor: "#27272A", py: 0.5, fontSize: 18 }}>{type}
                    </Button>
                </Stack>
            </ThemeProvider>
        </div>
    )
}

export default NewsCategoryTile;