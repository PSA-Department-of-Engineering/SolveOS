import { CircularProgress, Box } from "@mui/material";
import { loadingSpinnerContainerStyles } from "./LoadingSpinnerStyles";

export function LoadingSpinner() {
    return (
        <Box sx={loadingSpinnerContainerStyles}>
            <CircularProgress />
        </Box>
    );
}
