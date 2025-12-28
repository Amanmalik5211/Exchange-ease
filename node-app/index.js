const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
const path = require('path');
const http =require('http');
const { Server } = require("socket.io");
const bcrypt = require('bcrypt');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })

const app = express()


const httpServer = http.createServer(app);
const io =new Server(httpServer , {
  cors:{
    origin:'*',
  }
});

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const port = 5000
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://amanm85:amanm85@cluster0.chkzz6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('🔧 Check: 1) Atlas cluster active 2) IP whitelisted 3) Internet connection');
  });

const Users = mongoose.model('Users', {
  username: { type: String, minlength: 3, maxlength: 20 },
  mobile: { type: String, minlength: 10,maxlength: 10 },
  email: { type: String, minlength: 6, maxlength: 50 },
  password: { type: String },
  likedProducts:[{type:mongoose.Schema.Types.ObjectId, ref:'Products'}] 
    });

    let Schema= new mongoose.Schema(
      { 
        pname: String ,
        pdesc: String ,
        price:String ,
        pcategory:String ,
        pimage:String ,
        pimage2:String,
        addBy:mongoose.Schema.Types.ObjectId,
        pLoc:{
          type:{
            type:String,
            enum:['Point'],
            default:'Point'
          },
          coordinates:{
            type:[Number]
          }
        }
       })
          const Products = mongoose.model('Products',Schema);


let messages = [];
 io.on("connection", (socket) => {
            console.log('Socket connected', socket.id);
            socket.emit('getMsg', messages); 
            socket.on('sendMsg', (data) => {
              messages.push(data);
              io.emit('getMsg', messages);
            });
            socket.on('disconnect', () => {
              console.log('Socket disconnected', socket.id);
            });
   });
          
app.get('/', (req, res) => {
  res.send('HOME HOME HOME ')
})

app.post('/signup', async (req, res) => {
  const { username, password, email, mobile } = req.body;

  try {
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
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.send({ message: 'not find user' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.send({ message: 'password not match' });
    }

    const token = jwt.sign({ data: user }, 'mykey', { expiresIn: '1h' });
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
});

app.post('/add-product',upload.fields([{name:"pimage"},{name:"pimage2"}]), (req, res) => {
  try {
    const { pname, pdesc, price, pcategory, plat, plong } = req.body;
    
    // Check if files are uploaded
    if (!req.files || !req.files.pimage || !req.files.pimage2) {
      return res.status(400).send({ message: 'Both images are required' });
    }
    
    const pimage = req.files.pimage[0].path;
    const pimage2 = req.files.pimage2[0].path;
    const addBy = req.body.userId;
    
    // GeoJSON coordinates are [longitude, latitude]
    const product = new Products({ 
      pname, pdesc, price, pcategory, pimage, pimage2, addBy,
      pLoc: { type: 'Point', coordinates: [parseFloat(plong), parseFloat(plat)] }
    });
    
    product.save()
      .then(() => {
        res.send({ message: 'product added' })
      })
      .catch((err) => {
        console.error('Add product error:', err);
        res.status(500).send({ message: 'Error adding product' })
      })
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).send({ message: 'Server error' });
  }
})

app.get('/get-products',(req,res)=>{
  const catName = req.query.catName;
 let _f ={}
 if(catName){
  _f={pcategory:catName}
 }
  Products.find(_f)
  .then((result)=>{
    // console.log('product data @',result)
    res.send({message:'milgeeeee',product:result})
  })
    .catch((err)=>{
    res.send({message:'server000err'})
  })
})

// app.get('/get-all-products',(req,res)=>{
//   Products.find()
//   .then((result)=>{
//     console.log('product data @')
//     res.send({message:'milgeeeee',product:result})
//   })
//     .catch((err)=>{
//     res.send({message:'server err'})
//   })
// })
app.get('/get-products/:productid',(req,res)=>{
  Products.findOne({_id: req.params.productid })
    .then((result)=>{
      if (!result) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send({ message: 'success', product: result })
    })
    .catch((err)=>{
      console.error('Get product error:', err);
      res.status(500).send({ message: 'Server error' })
    })
})

app.get('/get-myproducts/:productid',(req,res)=>{
  Products.findOne({_id: req.params.productid })
    .then((result)=>{
      if (!result) {
        return res.status(404).send({ message: 'Product not found' });
      }
      res.send({ message: 'success', product: result })
    })
    .catch((err)=>{
      console.error('Get my product error:', err);
      res.status(500).send({ message: 'Server error' })
    })
})

app.get('/liked-products', (req, res) => {
  const userId = req.headers["x-auth-token"];
  if (!userId) {
    return res.status(400).send({ message: 'User ID is missing in headers' });
  }

  Users.findOne({ _id: userId })
    .populate('likedProducts')
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send({ message: 'Success', products: result });
    })
    .catch((err) => {
      console.error('Liked products error:', err);
      res.status(500).send({ message: 'Internal server error' });
    });
});

// app.post('/liked-products', (req, res) => {
//   Users.findOne({ _id: req.body.userId }).populate('likedProducts')
//     .then((result) => {
//       if (!result) {
//         console.log("User not found");
//         return res.status(404).send({ message: 'User not found' });
//       }
//       console.log(result, 'liked... data');
//       res.send({ message: 'Data found', products: result.likedProducts });
//     })
//     .catch((err) => {
//       console.error("Error:", err);
//       res.status(500).send({ message: 'Server error' });
//     });
// });



// app.get('/get-products/:key',async(req,res)=>{
//   console.log(req.params.key);
//   let data =await Products.find(
//     {
      // "$or":[                                      {..backend search api...........}
//         {"name":{$regex:req.params.key}}
//       ]
//     }
//   )

// })

app.post('/like-products',(req,res)=>{
  let productId = req.body.productId;
  let userId = req.body.userId;
    // console.log(userId,productId,"kyu");

    Users.updateOne({_id:userId},{$addToSet:{likedProducts:productId}})
    .then(()=>{
      res.send({message:'milgeexxxx like'})
    })
      .catch((err)=>{
      res.send({message:'server err'})
    })
})

app.post('/dislike-products',(req,res)=>{
  let productId = req.body.productId;
  let userId = req.body.userId;
    // console.log(userId,productId,"kyu");

    Users.updateOne({_id:userId},{$pull:{likedProducts:productId}})
    .then(()=>{
      res.send({message:'milgeexxxx like'})
    })
      .catch((err)=>{
      res.send({message:'server err'})
    })
})

app.get('/search', (req, res) => {
  let search = req.query.search;
  
  // Return empty results if no search term provided
  if (!search || search.trim() === '') {
    return res.status(200).json({ message: 'Search successful', products: [] });
  }
  
  Products.find({
      $or: [
          { pname: { $regex: search, $options: 'i' } },
          { pdesc: { $regex: search, $options: 'i' } },
          { pcategory: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } }
      ]
  })
  .then((results) => {
      res.status(200).json({ message: 'Search successful', products: results });
  })
  .catch((err) => {
      console.error('Search error:', err);
      res.status(500).json({ message: 'An error occurred while searching' });
  });
});

app.get('/my-products', (req, res) => {
  const userId = req.query.userId; // Access userId from req.query
  Products.find({ addBy: userId })
    .then((result) => {
      // console.log(result, 'my pro');
      res.send({ message: 'my productSuccess', products: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Internal server error' });
    });
});

app.get('/my-profile/:userId',(req,res)=>{
  let uid = req.params.userId;
  Users.findOne({_id:uid})
    .then((result)=>{
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send({
        message:'my profile',
        user:{
          email: result.email,
          mobile: result.mobile,
          username: result.username
        }
      })
    })
    .catch((err)=>{
      console.error('My profile error:', err);
      res.status(500).send({message:'Error fetching profile'})
    })
})

app.get('/get-user/:uId', (req, res) => {
  const _userId = req.params.uId;
  
  if (!_userId) {
    return res.status(400).send({ message: 'User ID is required' });
  }
  
  Users.findOne({_id: _userId})
    .then((result)=>{
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.send({
        message: 'prod deta contact',
        user: { 
          username: result.username, 
          email: result.email, 
          mobile: result.mobile 
        }
      })
    })
    .catch((err)=>{
      console.error('Get user error:', err);
      res.status(500).send({ message: 'Error fetching user contact' })
    })
})

app.post('/delete-product', async (req, res) => {
  try {
    const { pid, userId } = req.body;
    
    const product = await Products.findOne({ _id: pid });
    
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    
    // Compare ObjectIds properly using toString()
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
})

app.post('/edit-product',upload.fields([{name:"pimage"},{name:"pimage2"}]), (req, res) => {
  // console.log(req.files['pimage'][0].path, "bbb"); // Accessing the path of the first file in the 'pimage' field
  // console.log(req.files['pimage2'][0].path, "..yy");
  console.log(req.body,"9612")
  console.log(req.files);
  const { pname, pdesc, price, pcategory,pid} = req.body;
  let pimage = '';
  let pimage2 = '';
if(req.files && req.files.pimage && req.files.pimage.length>0 ){
   pimage = req.files.pimage[0].path;}

  if(req.files && req.files.pimage2 && req.files.pimage2.length>0 ){
     pimage2 = req.files.pimage2[0].path;}

  // const addBy =req.body.userId;
  // const product = new Products({ 
  //    pname ,pdesc ,price ,pcategory, pimage, pimage2, addBy });

  let editObj ={};
  if (pname){editObj.pname=pname}
  if (pdesc){editObj.pdesc=pdesc}
  if (price){editObj.price=price}
  if (pcategory){editObj.pcategory=pcategory}
  if (pimage){editObj.pimage = pimage}
  if (pimage2){editObj.pimage2=pimage2}

  Products.updateOne({_id:pid},editObj,{new:true})
    .then((result)=>{
      res.send({message:'Product Updated',product:result})
     }).catch(()=>{
      res.send({message:'server5252err'})
     })
})

httpServer.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})