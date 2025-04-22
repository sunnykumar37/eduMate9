import axiosClient from './axiosClient';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise} Promise with user data and token
 */
export const register = async (userData) => {
  try {
    const response = await axiosClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise} Promise with user data and token
 */
export const login = async (credentials) => {
  try {
    const response = await axiosClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

/**
 * Get current user data
 * @returns {Promise} Promise with user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await axiosClient.get('/auth/user');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get user data';
  }
};

/**
 * Initiate Google OAuth authentication
 * @returns {string} Google OAuth URL
 */
export const initiateGoogleAuth = () => {
  return `${window.location.origin}/api/auth/google`;
}; 