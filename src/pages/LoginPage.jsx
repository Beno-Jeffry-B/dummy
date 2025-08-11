import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage({ handleLogin }) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // In a real app, you would verify credentials here
        handleLogin();
        navigate('/dashboard');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 via-blue-300 to-indigo-300">
            <div className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-lg form-container mx-4">
                <div>
                    <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="login-email" className="sr-only">Email address</label>
                            <input
                                id="login-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Email address"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="login-password" className="sr-only">Password</label>
                            <input
                                id="login-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Password"
                            />
                        </div>

                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm font-medium text-blue-800 hover:text-blue-600">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-3 font-semibold text-white transition-transform duration-200 transform rounded-lg shadow-md submit-button hover:scale-105"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    <p className="mt-6 text-center text-gray-700">
                        Not a member?{' '}
                        <Link to="/signup" className="font-medium text-blue-800 hover:text-blue-600">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}