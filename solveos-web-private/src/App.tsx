import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter } from 'react-router-dom'
import { ApplicationTheme } from './theme/ApplicationTheme'
import { AppRouter } from './routes/AppRouter'

function App() {
    return (
        <ThemeProvider theme={ApplicationTheme}>
            <CssBaseline />
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
