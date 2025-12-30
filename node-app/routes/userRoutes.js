const express = require('express');
const router = express.Router();
const {
  getMyProfile,
  getUser,
  getLikedProducts
} = require('../controllers/userController');

router.get('/my-profile/:userId', getMyProfile);
router.get('/get-user/:uId', getUser);
router.get('/liked-products', getLikedProducts);

module.exports = router;

