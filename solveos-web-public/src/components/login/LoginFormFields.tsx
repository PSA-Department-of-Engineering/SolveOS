import { Box } from '@mui/material'
import { EmailField } from '../shared/EmailField'
import { PasswordField } from '../shared/PasswordField'
import type { LoginFormFieldsProps } from './LoginFormFieldsProps'
import { loginFormFieldsStyles } from './LoginFormFieldsStyles'

export function LoginFormFields({
    email,
    password,
    showPassword,
    emailError,
    passwordError,
    onEmailChange,
    onPasswordChange,
    onTogglePasswordVisibility,
}: LoginFormFieldsProps) {
    return (
        <Box sx={loginFormFieldsStyles.container}>
            <EmailField value={email} error={emailError} onChange={onEmailChange} />

            <PasswordField
                value={password}
                error={passwordError}
                showPassword={showPassword}
                onChange={onPasswordChange}
                onToggleVisibility={onTogglePasswordVisibility}
            />
        </Box>
    )
}
