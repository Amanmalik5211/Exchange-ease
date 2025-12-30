const Users = require('../models/User');

const getMyProfile = async (req, res) => {
  try {
    const uid = req.params.userId;
    const user = await Users.findOne({ _id: uid });
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.send({
      message: 'my profile',
      user: {
        email: user.email,
        mobile: user.mobile,
        username: user.username
      }
    });
  } catch (err) {
    console.error('My profile error:', err);
    res.status(500).send({ message: 'Error fetching profile' });
  }
};

const getUser = async (req, res) => {
  try {
    const _userId = req.params.uId;
    
    if (!_userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }
    
    const user = await Users.findOne({ _id: _userId });
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.send({
      message: 'prod deta contact',
      user: { 
        username: user.username, 
        email: user.email, 
        mobile: user.mobile 
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).send({ message: 'Error fetching user contact' });
  }
};

const getLikedProducts = async (req, res) => {
  try {
    const userId = req.headers["x-auth-token"];
    
    if (!userId) {
      return res.status(400).send({ message: 'User ID is missing in headers' });
    }
    
    const user = await Users.findOne({ _id: userId }).populate('likedProducts');
    
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    
    res.send({ message: 'Success', products: user });
  } catch (err) {
    console.error('Liked products error:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  getMyProfile,
  getUser,
  getLikedProducts
};

