import { Box, Container } from '@mui/material'
import { LoginPageHeader } from '../components/login/LoginPageHeader'
import { LoginPageBackground } from '../components/login/LoginPageBackground'
import type { LoginPageLayoutProps } from './LoginPageLayoutProps'
import { loginPageLayoutStyles } from './LoginPageLayoutStyles'

export function LoginPageLayout({ children }: LoginPageLayoutProps) {
    return (
        <Box sx={loginPageLayoutStyles.container}>
            <LoginPageBackground />

            <Container component="main" maxWidth="sm" sx={loginPageLayoutStyles.contentWrapper}>
                <Box sx={loginPageLayoutStyles.innerBox}>
                    <LoginPageHeader />
                    {children}
                </Box>
            </Container>
        </Box>
    )
}
