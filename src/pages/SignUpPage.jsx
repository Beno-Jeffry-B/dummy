import React, { useState } from 'react';

// This is the main component for the sign-up page.
function SignUpPage() {
    // State to manage all form fields together
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        course: '' // This field is part of the form but won't be sent to the backend
    });
    const [message, setMessage] = useState(''); // To display success or error messages

    // A single handler to update the state for any field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    /**
     * Handles the form submission.
     * It sends the user's registration data to the correct API endpoint.
     */
    const handleSignUpSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setMessage('Creating your account...');

        // The API endpoint for user registration, based on your documentation.
        const API_ENDPOINT = '/auth/register';

        // Prepare the data to be sent. We only include the fields the API expects.
        const submissionData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            // Using the fetch API to send a POST request to the registration endpoint.
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Server response:', result);
                setMessage('Sign up successful! Please log in.');
                // On success, redirect to the login page after a short delay.
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1500);
            } else {
                // This will run if the server exists but returns an error (e.g., 400, 409).
                const errorResult = await response.json();
                console.error('Server responded with an error:', response.status, errorResult);
                setMessage(`Error: ${errorResult.message || response.statusText}. Please try again.`);
            }
        } catch (error) {
            // This catch block will execute if there's a network error or the server is down.
            console.error('An error occurred during fetch:', error);
            setMessage('A network error occurred. Please check your connection and try again.');
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 via-cyan-300 to-blue-400 font-sans">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg form-container mx-4">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
                    <p className="mt-2 text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="font-medium text-blue-600 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignUpSubmit}>
                    <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Full Name"
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Email address"
                    />
                    <input
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Password"
                    />
                    <select
                        name="course"
                        required
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a course</option>
                        <option value="msc-software-systems">MSc Software Systems</option>
                        <option value="msc-data-science">MSc Data Science</option>
                        <option value="msc-theoretical-computer-science">MSc Theoretical Computer Science</option>
                        <option value="msc-cyber-security">MSc Cyber Security</option>
                    </select>

                    <button type="submit" className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
                        Sign Up
                    </button>
                </form>
                {/* Display a message to the user */}
                {message && <p className="text-center text-red-600 mt-4">{message}</p>}
            </div>
        </div>
    );
}

// The App component renders the SignUpPage to make it a complete, runnable example.
export default function App() {
    return <SignUpPage />;
}
