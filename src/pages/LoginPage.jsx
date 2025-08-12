import React, { useState } from 'react';

// --- Main Login Page Component ---

export default function LoginPage() {
    // State for the form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State for loading and error messages
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // In a real app, this would be passed via props or context to update the global auth state.
    const handleLogin = (token) => {
        // For this demo, we'll store the token in localStorage.
        // In a real app, you might use HttpOnly cookies or a more secure storage mechanism.
        localStorage.setItem('accessToken', token);
        console.log('Login successful, token stored.');
    };

    /**
     * Handles the form submission by calling the login API endpoint.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Corresponds to: POST /auth/login
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.message || 'Invalid credentials. Please try again.');
            }

            const result = await response.json();

            // Call the handleLogin function with the received token
            handleLogin(result.access_token);

            // Redirect to the dashboard on successful login
            // In a real app with routing, you would use the navigate function.
            window.location.href = '/dashboard';

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 via-blue-300 to-indigo-300 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg mx-4">
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email address"
                        />

                        {/* Password Input */}
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />

                        <div className="text-right">
                            {/* In a real app with routing, this would be a Link component */}
                            <a href="/forgot-password" className="text-sm font-medium text-blue-800 hover:text-blue-600">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-all"
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    {/* Display error message if any */}
                    {error && <p className="mt-4 text-center text-red-600">{error}</p>}

                    <p className="mt-6 text-center text-gray-700">
                        Not a member?{' '}
                        {/* In a real app with routing, this would be a Link component */}
                        <a href="/signup" className="font-medium text-blue-800 hover:text-blue-600">
                            Sign up now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
