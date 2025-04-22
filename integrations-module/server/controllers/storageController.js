const { google } = require('googleapis');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage }).single('file');

// Helper function to get Google Drive client
const getDriveClient = (accessToken) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  
  oauth2Client.setCredentials({
    access_token: accessToken
  });
  
  return google.drive({ version: 'v3', auth: oauth2Client });
};

// Get files from Google Drive
exports.getGoogleDriveFiles = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.googleAccessToken) {
      return res.status(401).json({ message: 'Google Drive not connected' });
    }
    
    const drive = getDriveClient(user.googleAccessToken);
    
    const response = await drive.files.list({
      pageSize: 20,
      fields: 'nextPageToken, files(id, name, mimeType, webViewLink, iconLink, thumbnailLink, createdTime, modifiedTime, size)',
      q: "trashed=false"
    });
    
    res.json(response.data.files);
  } catch (err) {
    console.error(err);
    if (err.code === 401) {
      return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific file from Google Drive
exports.getGoogleDriveFile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.googleAccessToken) {
      return res.status(401).json({ message: 'Google Drive not connected' });
    }
    
    const drive = getDriveClient(user.googleAccessToken);
    
    const fileId = req.params.fileId;
    
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, webViewLink, iconLink, thumbnailLink, createdTime, modifiedTime, size'
    });
    
    res.json(response.data);
  } catch (err) {
    console.error(err);
    if (err.code === 401) {
      return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload a file to Google Drive
exports.uploadToGoogleDrive = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload error' });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    try {
      const user = await User.findById(req.user.id);
      
      if (!user.googleAccessToken) {
        return res.status(401).json({ message: 'Google Drive not connected' });
      }
      
      const drive = getDriveClient(user.googleAccessToken);
      
      const filePath = req.file.path;
      const fileName = req.file.originalname;
      const fileMimeType = req.file.mimetype;
      
      const driveResponse = await drive.files.create({
        requestBody: {
          name: fileName,
          mimeType: fileMimeType
        },
        media: {
          mimeType: fileMimeType,
          body: fs.createReadStream(filePath)
        }
      });
      
      // Delete the temporary file
      fs.unlinkSync(filePath);
      
      res.json({
        message: 'File uploaded successfully',
        fileId: driveResponse.data.id
      });
    } catch (err) {
      console.error(err);
      if (err.code === 401) {
        return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  });
};

// Download a file from Google Drive
exports.downloadFromGoogleDrive = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.googleAccessToken) {
      return res.status(401).json({ message: 'Google Drive not connected' });
    }
    
    const drive = getDriveClient(user.googleAccessToken);
    
    const fileId = req.params.fileId;
    
    // Get file metadata
    const fileMetadata = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType'
    });
    
    const fileName = fileMetadata.data.name;
    
    // Download file
    const response = await drive.files.get({
      fileId,
      alt: 'media'
    }, { responseType: 'stream' });
    
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', fileMetadata.data.mimeType);
    
    response.data
      .on('error', err => {
        console.error(err);
        return res.status(500).end();
      })
      .pipe(res);
  } catch (err) {
    console.error(err);
    if (err.code === 401) {
      return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a file from Google Drive
exports.deleteGoogleDriveFile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.googleAccessToken) {
      return res.status(401).json({ message: 'Google Drive not connected' });
    }
    
    const drive = getDriveClient(user.googleAccessToken);
    
    const fileId = req.params.fileId;
    
    await drive.files.delete({
      fileId
    });
    
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    console.error(err);
    if (err.code === 401) {
      return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update file metadata in Google Drive
exports.updateGoogleDriveFile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.googleAccessToken) {
      return res.status(401).json({ message: 'Google Drive not connected' });
    }
    
    const drive = getDriveClient(user.googleAccessToken);
    
    const fileId = req.params.fileId;
    const { name } = req.body;
    
    const response = await drive.files.update({
      fileId,
      requestBody: {
        name
      }
    });
    
    res.json(response.data);
  } catch (err) {
    console.error(err);
    if (err.code === 401) {
      return res.status(401).json({ message: 'Google Drive token expired, please reconnect' });
    }
    res.status(500).json({ message: 'Server error' });
  }
}; 