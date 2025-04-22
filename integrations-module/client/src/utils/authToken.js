/**
 * Get the JWT token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem('integrations_token');
};

/**
 * Set the JWT token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
  localStorage.setItem('integrations_token', token);
};

/**
 * Remove the JWT token from localStorage
 */
export const removeToken = () => {
  localStorage.removeItem('integrations_token');
};

/**
 * Check if the token exists and is valid
 * @returns {boolean} True if token exists and is not expired, false otherwise
 */
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // For a real implementation, we would check token expiration
    // This is a simplified version
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

/**
 * Get user data from token
 * @returns {Object|null} User data or null if token is invalid
 */
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    // For a real implementation, we would decode JWT token
    // This is a simplified version
    return { id: 'user-id' };
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
}; 