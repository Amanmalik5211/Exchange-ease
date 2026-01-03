const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;
    
    if (!mongoURL) {
      console.error('MongoDB connection error: MONGODB_URL is not defined in environment variables');
      console.log('Please create a .env file in the node-app directory with: MONGODB_URL=your_connection_string');
      process.exit(1);
    }
    
    await mongoose.connect(mongoURL);
    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Check: 1) Atlas cluster active 2) IP whitelisted 3) Internet connection 4) MONGODB_URL is correct');
    process.exit(1);
  }
};

module.exports = connectDB;

