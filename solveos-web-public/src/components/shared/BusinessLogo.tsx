import { Box } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import { businessLogoStyles } from './BusinessLogoStyles'

export function BusinessLogo() {
    return (
        <Box sx={businessLogoStyles.container}>
            <BusinessIcon sx={businessLogoStyles.icon} />
        </Box>
    )
}
