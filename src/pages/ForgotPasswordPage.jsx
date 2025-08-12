import React, { useState, useRef } from 'react';

// --- Main Forgot Password Page Component ---

export default function ForgotPasswordPage() {
    const [step, setStep] = useState('enterEmail'); // Manages the current step of the form
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for loading and error/success messages
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const inputRefs = useRef([]); // To manage focus on the OTP inputs

    // --- API Handlers ---

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            // Corresponds to: POST /auth/forgot-password
            const response = await fetch('/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to send OTP.');

            setMessage(result.message);
            setStep('verifyOtp');
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = otp.join("");
        if (verificationCode.length < 6) {
            setMessage("Please enter the complete 6-digit code.");
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            // Corresponds to: POST /auth/verify-otp
            const response = await fetch('/auth/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: verificationCode }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Invalid OTP.');

            setMessage(result.message);
            setStep('resetPassword');
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordResetSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setIsLoading(true);
        setMessage('');
        try {
            // Corresponds to: POST /auth/reset-password
            const response = await fetch('/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: otp.join(""), newPassword, confirmPassword }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Failed to reset password.');

            setMessage(result.message);
            // Redirect to login after a short delay
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } catch (err) {
            setMessage(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- OTP Input Logic ---

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling && element.value) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
            e.target.previousSibling.focus();
        }
    };

    const handlePaste = (e) => {
        const value = e.clipboardData.getData("text");
        if (isNaN(value) || value.length !== 6) return;
        setOtp(value.split(""));
        inputRefs.current[5]?.focus();
    };

    // --- Render Logic ---

    const renderStepContent = () => {
        switch (step) {
            case 'verifyOtp':
                return (
                    <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
                        <h1 className="text-3xl font-bold text-center text-gray-800">Verify Your Email</h1>
                        <p className="text-center text-gray-600">Enter the 6-digit code sent to {email}.</p>
                        <div className="flex justify-center gap-2 md:gap-4" onPaste={handlePaste}>
                            {otp.map((data, index) => (
                                <input key={index} type="text" maxLength="1" value={data}
                                    ref={el => inputRefs.current[index] = el}
                                    onChange={e => handleOtpChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-2xl font-semibold border rounded-lg"
                                />
                            ))}
                        </div>
                        <button type="submit" disabled={isLoading} className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg disabled:bg-blue-400">
                            {isLoading ? 'Verifying...' : 'Verify'}
                        </button>
                    </form>
                );
            case 'resetPassword':
                return (
                    <form className="mt-8 space-y-6" onSubmit={handlePasswordResetSubmit}>
                        <h1 className="text-3xl font-bold text-center text-gray-800">Set New Password</h1>
                        <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="New Password" />
                        <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Confirm New Password" />
                        <button type="submit" disabled={isLoading} className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg disabled:bg-blue-400">
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                );
            default: // 'enterEmail'
                return (
                    <form className="mt-8 space-y-6" onSubmit={handleEmailSubmit}>
                        <h1 className="text-3xl font-bold text-center text-gray-800">Forgot Password</h1>
                        <p className="text-center text-gray-600">Enter your email to receive a verification code.</p>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border rounded-lg" placeholder="Email address" />
                        <button type="submit" disabled={isLoading} className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg disabled:bg-blue-400">
                            {isLoading ? 'Sending...' : 'Send Verification Code'}
                        </button>
                    </form>
                );
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-200 to-indigo-300 font-sans">
            <div className="w-full max-w-md p-8 space-y-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg mx-4">
                {renderStepContent()}
                {message && <p className="text-center text-red-600 mt-4">{message}</p>}
            </div>
        </div>
    );
}
