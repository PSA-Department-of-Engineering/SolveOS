import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { MainLayout } from '../layouts/MainLayout'

export function DashboardPage() {
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Dashboard
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <Paper sx={{ p: 2, minWidth: 200, flex: '1 1 200px' }}>
                        <Typography variant="h6">Total Orders</Typography>
                        <Typography variant="h4">0</Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 200, flex: '1 1 200px' }}>
                        <Typography variant="h6">Active Orders</Typography>
                        <Typography variant="h4">0</Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 200, flex: '1 1 200px' }}>
                        <Typography variant="h6">Total Revenue</Typography>
                        <Typography variant="h4">€0</Typography>
                    </Paper>
                    <Paper sx={{ p: 2, minWidth: 200, flex: '1 1 200px' }}>
                        <Typography variant="h6">Customers</Typography>
                        <Typography variant="h4">0</Typography>
                    </Paper>
                </Box>
            </Container>
        </MainLayout>
    )
}
