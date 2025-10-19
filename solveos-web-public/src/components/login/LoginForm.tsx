import { useState } from 'react'
import { Paper } from '@mui/material'
import { LoginFormFields } from './LoginFormFields'
import { LoginFormActions } from './LoginFormActions'
import { useLoginFormValidation } from '../../hooks/useLoginFormValidation'
import { useLoginSubmission } from '../../hooks/useLoginSubmission'
import { loginFormStyles } from './LoginFormStyles'

export function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const { emailError, passwordError, isFormValid } = useLoginFormValidation(email, password)
    const { isSubmitting, handleLogin } = useLoginSubmission()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (isFormValid) {
            await handleLogin(email, password)
        }
    }

    return (
        <Paper elevation={10} sx={loginFormStyles.paper}>
            <form onSubmit={handleSubmit} noValidate>
                <LoginFormFields
                    email={email}
                    password={password}
                    showPassword={showPassword}
                    emailError={emailError}
                    passwordError={passwordError}
                    onEmailChange={setEmail}
                    onPasswordChange={setPassword}
                    onTogglePasswordVisibility={() => setShowPassword(!showPassword)}
                />

                <LoginFormActions isSubmitting={isSubmitting} isDisabled={!isFormValid} />
            </form>
        </Paper>
    )
}
