import { LoginPageLayout } from '../layouts/LoginPageLayout'
import { LoginForm } from '../components/login/LoginForm'

/**
 * Public-facing login page.
 * Handles user authentication flow.
 */
export function LoginPage() {
    return (
        <LoginPageLayout>
            <LoginForm />
        </LoginPageLayout>
    )
}
