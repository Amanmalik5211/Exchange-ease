import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";


import './Home.css'
const LikedProduct = () => {

  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const [products,setProducts] = useState([]);
  const [likedproducts,setLikedproducts] = useState([]);
  const [cproducts,setCproducts] = useState([]);
  const [search,setSearch] = useState('');
  const [issearch,setIssearch] = useState(false);
  console.log("sdfghj76890987",likedproducts);
  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/login')
  //   }
  // },[])

  useEffect(() => {
    const url = "http://localhost:5000/liked-products";
    const userId = localStorage.getItem("userId");
  // console.log(userId,'xyz');
    axios.get(url, { 
      headers: {
        "x-auth-token": userId
      }     })
      .then((res) => {
        // console.log(res.data.products.likedProducts);
        if (res.data.products) { 
          setProducts(prevProducts => [...prevProducts, ...res.data.products.likedProducts]); // Use functional form of setProducts
          console.log("products", products); 
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error in10 products');
      })
      const url2 = "http://localhost:5000/liked-products";
      const userId2 = localStorage.getItem('userId');
      // console.log(us`erId,"polo");
      axios.get(url2, {
        headers: {
          "x-auth-token": userId2
        }
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data)
        setLikedproducts(res.data.products.likedProducts);
        // console.log("liked", likedproducts);
      })
      .catch((err) => {
        // console.log(err);
        alert('Error fetching liked products');
      });
      
        },[refresh]) 

  const handleSearch = (value)=>{
     setSearch(value)
  }
  const handleClick = ()=>{
    // console.log(products,'swqdxw');
  let filteredProducts = products.filter((item)=>{ 
    if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.pcategory.toLowerCase().includes(search.toLowerCase()
    )){
      return item;
    }
  })
  setCproducts(filteredProducts)
  }

  const handleCategory = (value)=>{
    let filteredProducts = products.filter((item,index)=>{ 
    //  console.log(value,item,'vv78');
    if (item.pcategory===value){
      return item;
      // console.log(item);
    }
  })
  setCproducts(filteredProducts)
  }


//  const handleLike =(productId)=>{
//    let userId = localStorage.getItem("userId");
//   //  console.log(userId,productId,"uuuu");
//     const url = "http://localhost:5000/like-products";
//     const data = {userId,productId}
//    axios.post(url,data)
//    .then((res)=>{
//     if(res.data.message){
//       alert("liked")
//     }
//    })
//    .catch((err)=>{
//     console.log(err)
//     alert('error in products')
//    })
// }
// const handleProducts= (id)=>{
//   navigate('/product/'+id)
// }

const handleProducts= (id)=>{
  navigate('/product/'+id)
}
const handleDislike = (productId) => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    alert('Please login first');
    return;
  }

  const url = "http://localhost:5000/dislike-products";
  const data = { userId, productId };

  axios.post(url, data)
    .then((res) => {
      if (res.data.message) {
        alert("Disliked");
        console.log("Disliked", res.data);

        // Update likedproducts state to remove the disliked product
        setLikedproducts(prevLikedProducts => prevLikedProducts.filter(item => item._id !== productId));
        
        // Optionally, you can update other relevant state or trigger a refresh here
        // setRefresh(!refresh);
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Error in disliking product');
    });
}

  return (
    <div>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>
      <div className='d-flex justify-content-center flex-wrap'>
      {cproducts && cproducts.length>0 &&
         cproducts.map((item,index)=>{
           return(
             <div key={item._id} className='card m-4'>
            <div className='icon-cont'>
                 {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                        <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>) : (
                             <FaHeart className='icon' />
                                   )}
                  </div>            
            <img onClick = {()=>handleProducts(item._id)} width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
            <p className=' m-2'> {item.pname} | {item.pcategory}</p>
            <p className=' m-2 price-text'> ₹ {item.price}</p>
            <p className=' m-2  text-success'> {item.pdesc}</p>
             </div>
          )
        })
      }
      </div>
      <div className='d-flex justify-content-center flex-wrap'>
      {products && products.length>0 &&
         products.map((item,index)=>{
          return(
            <div key={item._id} className='card m-4'>

     <div className='icon-cont'>
              {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                        <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>): (
                             <FaHeart className='icon' />
                                   )}
                  </div>           
             <img onClick = {()=>handleProducts(item._id)} width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
            <p className=' m-2'> {item.pname} | {item.pcategory}</p>
            <p className=' m-2 price-text'> ₹ {item.price}</p>
            <p className=' m-2  text-success'> {item.pdesc}</p>
             </div>
          )
         })
      }
      </div>
    </div>
  )
  
}

export default LikedProduct
