const Users = require('../models/User');

const likeProduct = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    
    await Users.updateOne(
      { _id: userId }, 
      { $addToSet: { likedProducts: productId } }
    );
    
    res.send({ message: 'milgeexxxx like' });
  } catch (err) {
    console.error('Like product error:', err);
    res.send({ message: 'server err' });
  }
};

const dislikeProduct = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    
    await Users.updateOne(
      { _id: userId }, 
      { $pull: { likedProducts: productId } }
    );
    
    res.send({ message: 'milgeexxxx like' });
  } catch (err) {
    console.error('Dislike product error:', err);
    res.send({ message: 'server err' });
  }
};

module.exports = {
  likeProduct,
  dislikeProduct
};

