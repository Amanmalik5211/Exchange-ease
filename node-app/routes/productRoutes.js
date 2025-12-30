const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');

router.post('/add-product', upload.fields([{ name: "pimage" }, { name: "pimage2" }]), addProduct);
router.get('/get-products', getProducts);
router.get('/get-products/:productid', getProductById);
router.post('/edit-product', upload.fields([{ name: "pimage" }, { name: "pimage2" }]), editProduct);
router.post('/delete-product', deleteProduct);
router.get('/my-products', getMyProducts);

module.exports = router;

