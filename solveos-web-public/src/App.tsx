import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ApplicationTheme } from './theme/ApplicationTheme'
import { LoginPage } from './pages/LoginPage'

function App() {
    return (
        <ThemeProvider theme={ApplicationTheme}>
            <CssBaseline />
            <LoginPage />
        </ThemeProvider>
    )
}

export default App
