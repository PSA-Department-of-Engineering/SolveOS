import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MainLayout } from "../layouts/MainLayout";

export function ReportsPage() {
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Reports
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Reports and analytics coming soon...
                </Typography>
            </Container>
        </MainLayout>
    );
}
