const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://amanm85:amanm85@cluster0.chkzz6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    
    await mongoose.connect(mongoURI);
    console.log(' MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.log('Check: 1) Atlas cluster active 2) IP whitelisted 3) Internet connection');
    process.exit(1);
  }
};

module.exports = connectDB;

