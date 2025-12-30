const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  pname: String,
  pdesc: String,
  price: String,
  pcategory: String,
  pimage: String,
  pimage2: String,
  addBy: mongoose.Schema.Types.ObjectId,
  pLoc: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
});

const Products = mongoose.model('Products', productSchema);

module.exports = Products;

