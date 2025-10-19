import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { MainLayout } from "../layouts/MainLayout";

export function CustomersPage() {
    return (
        <MainLayout>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom>
                    Customers
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ mb: 2 }}
                >
                    New Customer
                </Button>
                <Typography variant="body1" color="text.secondary">
                    Customer management coming soon...
                </Typography>
            </Container>
        </MainLayout>
    );
}
