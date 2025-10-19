import { Box } from '@mui/material'
import { loginPageBackgroundStyles } from './LoginPageBackgroundStyles'

/**
 * Decorative background for the login page.
 * Provides visual aesthetic without interfering with content.
 */
export function LoginPageBackground() {
    return (
        <>
            <Box sx={loginPageBackgroundStyles.backgroundImage} />
            <Box sx={loginPageBackgroundStyles.overlay} />
        </>
    )
}
