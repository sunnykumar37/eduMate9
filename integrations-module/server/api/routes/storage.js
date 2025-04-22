const express = require('express');
const router = express.Router();
const passport = require('passport');
const { google } = require('googleapis');
const storageController = require('../../controllers/storageController');

// Middleware to authenticate user
const auth = passport.authenticate('jwt', { session: false });

// Google Drive routes
// @route   GET api/storage/google/files
// @desc    Get files from Google Drive
// @access  Private
router.get('/google/files', auth, storageController.getGoogleDriveFiles);

// @route   GET api/storage/google/file/:fileId
// @desc    Get a specific file from Google Drive
// @access  Private
router.get('/google/file/:fileId', auth, storageController.getGoogleDriveFile);

// @route   POST api/storage/google/upload
// @desc    Upload a file to Google Drive
// @access  Private
router.post('/google/upload', auth, storageController.uploadToGoogleDrive);

// @route   GET api/storage/google/download/:fileId
// @desc    Download a file from Google Drive
// @access  Private
router.get('/google/download/:fileId', auth, storageController.downloadFromGoogleDrive);

// @route   DELETE api/storage/google/file/:fileId
// @desc    Delete a file from Google Drive
// @access  Private
router.delete('/google/file/:fileId', auth, storageController.deleteGoogleDriveFile);

// @route   PUT api/storage/google/file/:fileId
// @desc    Update file metadata in Google Drive
// @access  Private
router.put('/google/file/:fileId', auth, storageController.updateGoogleDriveFile);

// OneDrive routes (to be implemented)
router.get('/onedrive/files', auth, (req, res) => {
  res.json({ message: 'OneDrive integration coming soon' });
});

// Dropbox routes (to be implemented)
router.get('/dropbox/files', auth, (req, res) => {
  res.json({ message: 'Dropbox integration coming soon' });
});

module.exports = router; 