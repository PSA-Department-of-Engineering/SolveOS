import { createTheme } from "@mui/material/styles";

export const ApplicationTheme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",
            light: "#42a5f5",
            dark: "#1565c0",
        },
        secondary: {
            main: "#9c27b0",
            light: "#ba68c8",
            dark: "#7b1fa2",
        },
        error: {
            main: "#d32f2f",
        },
        success: {
            main: "#2e7d32",
        },
        warning: {
            main: "#ed6c02",
        },
        info: {
            main: "#0288d1",
        },
        background: {
            default: "#f5f5f5",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 500,
        },
        h6: {
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
});
