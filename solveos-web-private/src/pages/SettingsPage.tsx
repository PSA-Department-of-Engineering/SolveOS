import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { MainLayout } from '../layouts/MainLayout'

export function SettingsPage() {
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Settings coming soon...
                </Typography>
            </Container>
        </MainLayout>
    )
}
