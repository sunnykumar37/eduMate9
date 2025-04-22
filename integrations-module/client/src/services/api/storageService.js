import axiosClient from './axiosClient';

/**
 * Get files from Google Drive
 * @returns {Promise} Promise with files data
 */
export const getGoogleDriveFiles = async () => {
  try {
    const response = await axiosClient.get('/storage/google/files');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get Google Drive files';
  }
};

/**
 * Get a specific file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise} Promise with file data
 */
export const getGoogleDriveFile = async (fileId) => {
  try {
    const response = await axiosClient.get(`/storage/google/file/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get Google Drive file';
  }
};

/**
 * Upload a file to Google Drive
 * @param {FormData} formData - Form data with file
 * @returns {Promise} Promise with upload result
 */
export const uploadToGoogleDrive = async (formData) => {
  try {
    const response = await axiosClient.post('/storage/google/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to upload file to Google Drive';
  }
};

/**
 * Download a file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise} Promise with download URL
 */
export const downloadFromGoogleDrive = async (fileId) => {
  try {
    // Using window.open to trigger file download
    window.open(`/api/storage/google/download/${fileId}`, '_blank');
    return { success: true };
  } catch (error) {
    throw error.response?.data?.message || 'Failed to download file from Google Drive';
  }
};

/**
 * Delete a file from Google Drive
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise} Promise with delete result
 */
export const deleteGoogleDriveFile = async (fileId) => {
  try {
    const response = await axiosClient.delete(`/storage/google/file/${fileId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete Google Drive file';
  }
};

/**
 * Update file metadata in Google Drive
 * @param {string} fileId - Google Drive file ID
 * @param {Object} metadata - File metadata to update
 * @returns {Promise} Promise with update result
 */
export const updateGoogleDriveFile = async (fileId, metadata) => {
  try {
    const response = await axiosClient.put(`/storage/google/file/${fileId}`, metadata);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update Google Drive file';
  }
}; 