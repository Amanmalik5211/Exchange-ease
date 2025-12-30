const Products = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const { pname, pdesc, price, pcategory, plat, plong } = req.body;
    
    if (!req.files || !req.files.pimage || !req.files.pimage2) {
      return res.status(400).send({ message: 'Both images are required' });
    }
    
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addBy = req.body.userId;
    
    const product = new Products({ 
      pname, 
      pdesc, 
      price, 
      pcategory, 
      pimage, 
      pimage2, 
      addBy,
      pLoc: { 
        type: 'Point', 
        coordinates: [parseFloat(plong), parseFloat(plat)] 
      }
    });
    
    await product.save();
    res.send({ message: 'product added' });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).send({ message: 'Error adding product' });
  }
};

const getProducts = async (req, res) => {
  try {
    const catName = req.query.catName;
    const filter = catName ? { pcategory: catName } : {};
    
    const products = await Products.find(filter);
    res.send({ message: 'milgeeeee', product: products });
  } catch (err) {
    console.error('Get products error:', err);
    res.send({ message: 'server000err' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({ _id: req.params.productid });
    
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    
    res.send({ message: 'success', product });
  } catch (err) {
    console.error('Get product error:', err);
    res.status(500).send({ message: 'Server error' });
  }
};

const editProduct = async (req, res) => {
  try {
    const { pname, pdesc, price, pcategory, pid } = req.body;
    let pimage = '';
    let pimage2 = '';
    
    if (req.files && req.files.pimage && req.files.pimage.length > 0) {
      pimage = req.files.pimage[0].path;
    }
    
    if (req.files && req.files.pimage2 && req.files.pimage2.length > 0) {
      pimage2 = req.files.pimage2[0].path;
    }
    
    const editObj = {};
    if (pname) editObj.pname = pname;
    if (pdesc) editObj.pdesc = pdesc;
    if (price) editObj.price = price;
    if (pcategory) editObj.pcategory = pcategory;
    if (pimage) editObj.pimage = pimage;
    if (pimage2) editObj.pimage2 = pimage2;
    
    const result = await Products.updateOne({ _id: pid }, editObj, { new: true });
    res.send({ message: 'Product Updated', product: result });
  } catch (err) {
    console.error('Edit product error:', err);
    res.send({ message: 'server5252err' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { pid, userId } = req.body;
    
    const product = await Products.findOne({ _id: pid });
    
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    
    if (product.addBy.toString() !== userId) {
      return res.status(403).send({ message: 'Not authorized to delete this product' });
    }
    
    const deleteResult = await Products.deleteOne({ _id: pid });
    
    if (deleteResult.deletedCount > 0) {
      res.send({ message: 'success' });
    } else {
      res.status(500).send({ message: 'Failed to delete product' });
    }
  } catch (err) {
    console.error('Delete product error:', err);
    res.status(500).send({ message: 'Server error' });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const userId = req.query.userId;
    const products = await Products.find({ addBy: userId });
    res.send({ message: 'my productSuccess', products });
  } catch (err) {
    console.error('Get my products error:', err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  editProduct,
  deleteProduct,
  getMyProducts
};

