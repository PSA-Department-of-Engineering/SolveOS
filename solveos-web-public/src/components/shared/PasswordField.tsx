import { TextField, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import type { PasswordFieldProps } from './PasswordFieldProps'

export function PasswordField({
    value,
    error,
    showPassword,
    onChange,
    onToggleVisibility,
}: PasswordFieldProps) {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={Boolean(error)}
            helperText={error}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={onToggleVisibility}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}
