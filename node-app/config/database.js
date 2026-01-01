const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    await mongoose.connect(mongoURI);
    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Check: 1) Atlas cluster active 2) IP whitelisted 3) Internet connection');
    process.exit(1);
  }
};

module.exports = connectDB;

