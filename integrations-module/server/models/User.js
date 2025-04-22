const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  
  // Google OAuth
  googleId: {
    type: String
  },
  googleAccessToken: {
    type: String
  },
  googleRefreshToken: {
    type: String
  },
  
  // Microsoft OAuth
  microsoftId: {
    type: String
  },
  microsoftAccessToken: {
    type: String
  },
  microsoftRefreshToken: {
    type: String
  },
  
  // Dropbox OAuth
  dropboxId: {
    type: String
  },
  dropboxAccessToken: {
    type: String
  },
  dropboxRefreshToken: {
    type: String
  },
  
  // Zoom OAuth
  zoomId: {
    type: String
  },
  zoomAccessToken: {
    type: String
  },
  zoomRefreshToken: {
    type: String
  },
  
  // LMS Credentials
  canvasToken: {
    type: String
  },
  blackboardId: {
    type: String
  },
  blackboardToken: {
    type: String
  },
  moodleToken: {
    type: String
  },

  integrations: {
    googleDrive: {
      connected: {
        type: Boolean,
        default: false
      },
      accessToken: String,
      refreshToken: String,
      expiryDate: Date
    },
    onedrive: {
      connected: {
        type: Boolean,
        default: false
      },
      accessToken: String,
      refreshToken: String,
      expiryDate: Date
    },
    dropbox: {
      connected: {
        type: Boolean,
        default: false
      },
      accessToken: String,
      refreshToken: String,
      expiryDate: Date
    },
    googleCalendar: {
      connected: {
        type: Boolean,
        default: false
      },
      accessToken: String,
      refreshToken: String,
      expiryDate: Date
    },
    canvas: {
      connected: {
        type: Boolean,
        default: false
      },
      apiKey: String,
      domain: String
    },
    zoom: {
      connected: {
        type: Boolean,
        default: false
      },
      accessToken: String,
      refreshToken: String,
      expiryDate: Date
    }
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema); 