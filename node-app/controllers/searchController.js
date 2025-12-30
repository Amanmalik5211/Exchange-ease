const Products = require('../models/Product');

const searchProducts = async (req, res) => {
  try {
    let search = req.query.search;
    
    if (!search || search.trim() === '') {
      return res.status(200).json({ message: 'Search successful', products: [] });
    }
    
    const products = await Products.find({
      $or: [
        { pname: { $regex: search, $options: 'i' } },
        { pdesc: { $regex: search, $options: 'i' } },
        { pcategory: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } }
      ]
    });
    
    res.status(200).json({ message: 'Search successful', products });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ message: 'An error occurred while searching' });
  }
};

module.exports = {
  searchProducts
};

