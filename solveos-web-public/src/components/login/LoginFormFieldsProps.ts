export interface LoginFormFieldsProps {
    email: string
    password: string
    showPassword: boolean
    emailError: string
    passwordError: string
    onEmailChange: (value: string) => void
    onPasswordChange: (value: string) => void
    onTogglePasswordVisibility: () => void
}
