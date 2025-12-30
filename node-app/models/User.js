const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    minlength: 3, 
    maxlength: 20 
  },
  mobile: { 
    type: String, 
    minlength: 10, 
    maxlength: 10 
  },
  email: { 
    type: String, 
    minlength: 6, 
    maxlength: 50 
  },
  password: { 
    type: String 
  },
  likedProducts: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Products'
  }]
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;

