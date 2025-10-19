import { Box } from '@mui/material'
import { loginPageBackgroundStyles } from './LoginPageBackgroundStyles'

export function LoginPageBackground() {
    return (
        <>
            <Box sx={loginPageBackgroundStyles.backgroundImage} />
            <Box sx={loginPageBackgroundStyles.overlay} />
        </>
    )
}
