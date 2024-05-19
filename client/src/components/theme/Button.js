import React from "react";
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

const lightGray = "#FAF5FF";
const GrayMain = alpha(lightGray, 0.7);
const GrayTheme = createTheme({
    typography: {
        button: {
            fontSize: 18,
            fontWeight: 500,
        },
    },
    palette: {
        lightGray: {
            main: GrayMain,
            light: alpha(lightGray, 0.5),
            dark: alpha(lightGray, 0.9),
            contrastText: getContrastRatio(GrayMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

const lightViolet = "#FAF5FF";
const violetMain = alpha(lightViolet, 0.7);
const violetTheme = createTheme({
    typography: {
        button: {
            fontSize: 18,
            fontWeight: 500,
        },
    },
    palette: {
        lightViolet: {
            main: violetMain,
            light: alpha(lightViolet, 0.5),
            dark: alpha(lightViolet, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

const lightBlue = '#E0E7FF';
const blueMain = alpha(lightBlue, 0.7);
const blueTheme = createTheme({
    typography: {
        button: {
            fontSize: 18,
            fontWeight: 500,
        },
    },
    palette: {
        lightBlue: {
            main: blueMain,
            light: alpha(lightBlue, 0.5),
            dark: alpha(lightBlue, 0.9),
            contrastText: getContrastRatio(blueMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
});

export { blueTheme, lightBlue, lightViolet, violetTheme, GrayTheme, lightGray };