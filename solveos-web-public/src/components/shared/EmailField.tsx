import { TextField } from '@mui/material'
import type { EmailFieldProps } from './EmailFieldProps'

/**
 * Reusable email input field with validation.
 */
export function EmailField({ value, error, onChange }: EmailFieldProps) {
    return (
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={value}
            onChange={(e) => onChange(e.target.value)}
            error={Boolean(error)}
            helperText={error}
        />
    )
}
