import { Box, Button, Link, Typography } from '@mui/material'
import type { LoginFormActionsProps } from './LoginFormActionsProps'
import { loginFormActionsStyles } from './LoginFormActionsStyles'

export function LoginFormActions({ isSubmitting, isDisabled }: LoginFormActionsProps) {
    return (
        <>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isDisabled || isSubmitting}
                sx={loginFormActionsStyles.submitButton}
            >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box sx={loginFormActionsStyles.forgotPasswordBox}>
                <Link href="#" variant="body2" sx={loginFormActionsStyles.forgotPasswordLink}>
                    Forgot password?
                </Link>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={loginFormActionsStyles.copyright}>
                © 2025 SolveOS. All rights reserved.
            </Typography>
        </>
    )
}
