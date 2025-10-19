import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { ApplicationTheme } from "./theme/ApplicationTheme";
import { AppRouter } from "./routes/AppRouter";
import { useAuth } from "./hooks/useAuth";
import { LoadingSpinner } from "./components/LoadingSpinner";

function App() {
    const { user, loading, error } = useAuth();
    return (
        <ThemeProvider theme={ApplicationTheme}>
            <CssBaseline />
            {loading ? (
                <LoadingSpinner />
            ) : error || !user ? (
                null // Don't render anything, let the redirect happen
            ) : (
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            )}
        </ThemeProvider>
    );
}

export default App;
