const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');

const signup = async (req, res) => {
  try {
    const { username, password, email, mobile } = req.body;

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.send({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ username, email, password: hashedPassword, mobile });
    await user.save();
    
    res.send({ message: 'saved user' });
  } catch (error) {
    console.error("Signup error:", error);
    res.send({ message: 'server err' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.send({ message: 'not find user' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.send({ message: 'password not match' });
    }

    const token = jwt.sign(
      { data: user }, 
      process.env.JWT_SECRET || 'mykey', 
      { expiresIn: process.env.JWT_EXPIRE || '1h' }
    );
    return res.send({
      message: 'find user',
      token: token,
      userId: user._id,
      username: user.username,
    });

  } catch (error) {
    console.error(error);
    res.send({ message: 'server err' });
  }
};

module.exports = {
  signup,
  login
};

