const express = require('express');
const router = express.Router();
const { likeProduct, dislikeProduct } = require('../controllers/likeController');

router.post('/like-products', likeProduct);
router.post('/dislike-products', dislikeProduct);

module.exports = router;

