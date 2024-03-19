const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage },{ dest: 'uploads/' })

const app = express()
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
const port = 5000
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://amanm85:amanm85@cluster0.chkzz6a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Users = mongoose.model('Users', {
  username: { type: String, minlength: 3, maxlength: 20 },
  mobile: { type: String, minlength: 10,maxlength: 10 },
  email: { type: String, minlength: 6, maxlength: 50 },
  password: { type: String, minlength: 5, maxlength: 20 },
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

       Schema.index({pLoc:'2dsphere'});  //ass pass ke search ke liye..

const Products = mongoose.model('Products',Schema);


app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully.');
});

app.get('/', (req, res) => {
  res.send('HOME HOME HOME ')
})

app.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const mobile = req.body.mobile;
  // console.log(req.body);
  const user = new Users({ username: username, email:email , password:password,mobile:mobile });
    user.save()
    .then(()=>{
      res.send({message:'saved user'})
     }).catch(()=>{
      res.send({message:'server err'})
     })
})

app.post('/login', (req, res) => {
  // const username = req.body.username;
  const password = req.body.password;
  // console.log('loginnn');
  const email = req.body.email;
  // console.log(req.body);
  Users.findOne({email})
  .then((result)=>{
    // console.log(result,'user data')
    if(!result){
      res.send({message:'not find user'})}
    else{
      if(result.password==password){
        const token = jwt.sign({data: result}, 'mykey', { expiresIn: '1h' });
      res.send({message:'find user',token:token,userId:result._id})
    }
    if(result.password!=password){
      res.send({message:'password not match'})
    }
    }
  }).catch(()=>{
    res.send({message:'server err'})
  })
})

app.post('/add-product',upload.fields([{name:"pimage"},{name:"pimage2"}]), (req, res) => {
  // console.log(req.files['pimage'][0].path, "bbb"); // Accessing the path of the first file in the 'pimage' field
  // console.log(req.files['pimage2'][0].path, "..yy");
  // console.log(req.body,"jknjk")
  // console.log(req.files);
  const { pname, pdesc, price, pcategory,plat,plong } = req.body;
  const pimage = req.files.pimage[0].path;
  const pimage2 = req.files.pimage2[0].path;
  const addBy =req.body.userId;
  
  const product = new Products({ 
     pname ,pdesc ,price ,pcategory, pimage, pimage2, addBy , pLoc: {type:'Point',coordinates:[plat,plong]} });
  product.save()
    .then(()=>{
      res.send({message:'product added'})
     }).catch(()=>{
      res.send({message:'server5252err'})
     })
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
  // console.log(req.params,"99");
  Products.findOne({_id :req.params.productid })
  .then((result)=>{
    // console.log('product data....')
    res.send({message:'milgeeeee',product:result})
  })
    .catch((err)=>{
    res.send({message:'server err'})
  })
})

app.get('/liked-products', (req, res) => {
  // console.log("UserId", req.headers["x-auth-token"]); 
  const userId = req.headers["x-auth-token"]; // Retrieve user ID from headers
  if (!userId) {
    return res.status(400).send({ message: 'User ID is missing in headers' });
  }

  Users.findOne({ _id: userId })
    .populate('likedProducts')
    .then((result) => {
      // console.log('liked data');
      res.send({ message: 'Success', products: result });
    })
    .catch((err) => {
      console.error(err);
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
  // if (!req.query.loc || !req.query.loc.includes(',')) {
  //     return res.status(400).json({ error: 'Invalid or missing loc parameter' });
  // }
  // let locParts = req.query.loc.split(',');
  // let latitude = locParts[0];
  // let longitude = locParts[1];
  let search = req.query.search;
  Products.find({
      $or: [
          { pname: { $regex: search, $options: 'i' } },
          { pdesc: { $regex: search, $options: 'i' } },
          { pcategory: { $regex: search, $options: 'i' } },
          { price: { $regex: search, $options: 'i' } }
      ]
      // pLoc: {
      //     $near: {
      //         $geometry: {
      //             type: 'Point',
      //             coordinates: [parseFloat(longitude), parseFloat(latitude)]
      //         }
      //     }
      // }
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
//  console.log(req.params,'myyyyyyy');
 let uid = req.params.userId;
 Users.findOne({_id:uid})
 .then((result)=>{
  res.send({
      message:'my profile',user:{
        email:result.email,
        mobile:result.mobile,
        username:result.username
      }
  })
 })
 .catch(()=>{
  res.send({message:'my-profile errr'})
 })
})

app.get('/get-user/:uId', (req, res) => {
 const _userId = req.params.uId;
  Users.findOne({_id:_userId})
  .then((result)=>{
    // console.log(result,'user data')
   res.send({message:'prod deta contact',user:{username:result.username, email:result.email, mobile:result.mobile}})
  }).catch(()=>{
    res.send({message:'contact nhi kr skte'})
  })
})

app.post('/delete-product',(req,res)=>{
  console.log(req.body);
  Products.findOne({_id:req.body.pid})
  .then((result)=>{
    // console.log('delete data @',result)
    // res.send({message:'milgeeeee',product:result})
    if(result.addBy == req.body.userId){
      Products.deleteOne({_id : req.body.pid})
      .then((deleteitem)=>{
          //  console.log(deleteitem);
          if(deleteitem.acknowledged){res.send({message:"success"})}
          })
      .catch((err)=>{alert('Can not delete it')})
    }
  }).catch((err)=>{
    res.send({message:'server000err'})
  })
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})