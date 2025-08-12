import apiClient from '../api/axios';

export const registerUser = (userData) => {
    // Body: { name, email, mobile, password }
    return apiClient.post('/auth/register', userData);
};

export const loginUser = (credentials) => {
    // Body: { email, password }
    return apiClient.post('/auth/login', credentials);
};

export const forgotPassword = (email) => {
    // Body: { email }
    return apiClient.post('/auth/forgot-password', { email });
};

export const verifyOtp = (data) => {
    // Body: { email, otp }
    return apiClient.post('/auth/verify-otp', data);
};

export const resetPassword = (data) => {
    // Body: { email, otp, newPassword, confirmPassword }
    return apiClient.post('/auth/reset-password', data);
};