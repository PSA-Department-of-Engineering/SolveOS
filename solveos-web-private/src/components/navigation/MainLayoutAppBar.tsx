import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { config } from "../../config/appConfig";
import { appBarStyles, titleStyles } from "./MainLayoutAppBarStyles";

export function MainLayoutAppBar() {
    const handleLogout = () => {
        // TODO: HttpOnly cookie should be cleared by backend logout endpoint
        window.location.href = config.loginPageUrl;
    };

    return (
        <AppBar position="fixed" sx={appBarStyles}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={titleStyles}>
                    SolveOS
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={handleLogout}
                    aria-label="logout"
                >
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
