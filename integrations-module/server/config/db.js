const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB connection string
    const conn = await mongoose.connect('mongodb+srv://sunny:sunny@cluster0.ek5t3tz.mongodb.net/EduMate?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB; 