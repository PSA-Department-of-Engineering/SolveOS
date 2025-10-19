export interface PasswordFieldProps {
    value: string
    error: string
    showPassword: boolean
    onChange: (value: string) => void
    onToggleVisibility: () => void
}
