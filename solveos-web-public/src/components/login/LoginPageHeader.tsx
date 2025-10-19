import { Box, Typography } from '@mui/material'
import { BusinessLogo } from '../shared/BusinessLogo'
import { loginPageHeaderStyles } from './LoginPageHeaderStyles'

/**
 * Header section of the login page.
 * Displays branding and welcome message.
 */
export function LoginPageHeader() {
    return (
        <Box sx={loginPageHeaderStyles.container}>
            <BusinessLogo />
            <Typography component="h1" variant="h4" sx={loginPageHeaderStyles.title}>
                Welcome to SolveOS
            </Typography>
            <Typography variant="body1" sx={loginPageHeaderStyles.subtitle}>
                Sign in to manage your orders
            </Typography>
        </Box>
    )
}
