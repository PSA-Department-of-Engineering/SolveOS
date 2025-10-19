import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import LogoutIcon from '@mui/icons-material/Logout'
import { clearAuthToken } from '../../utils/tokenStorage'
import { config } from '../../config/appConfig'

export function MainLayoutAppBar() {
    const handleLogout = () => {
        clearAuthToken()
        window.location.href = config.loginPageUrl
    }

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    SolveOS
                </Typography>
                <IconButton color="inherit" onClick={handleLogout} aria-label="logout">
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
