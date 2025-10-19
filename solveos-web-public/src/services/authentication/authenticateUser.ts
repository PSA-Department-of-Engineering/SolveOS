/**
 * Authenticates a user with email and password.
 * TODO: Connect to actual backend authentication endpoint.
 */
export async function authenticateUser(email: string, password: string): Promise<void> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO: Replace with actual API call to FastAPI backend
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })
    //
    // if (!response.ok) {
    //   throw new Error('Authentication failed')
    // }
    //
    // return response.json()

    console.log('Authenticating user:', email)
}
