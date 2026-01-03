import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import './LikedProduct.css';
import './Home.css'
import { toast } from 'react-toastify';
import { API_ENDPOINTS, getImageUrl } from '../config/api';
const LikedProduct = () => {

  const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const [likedproducts,setLikedproducts] = useState([]);
  const [cproducts,setCproducts] = useState([]);
  const [search,setSearch] = useState('');
  console.log("sdfghj76890987",likedproducts);
 

  useEffect(() => {
    const url = API_ENDPOINTS.LIKED_PRODUCTS;
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      return;
    }
    
    axios.get(url, { 
      headers: {
        "x-auth-token": userId
      }
    })
    .then((res) => {
      if (res.data.products) { 
        // Replace products instead of appending to prevent duplicates
        setProducts(res.data.products.likedProducts);
        setLikedproducts(res.data.products.likedProducts);
      }
    })
    .catch((err) => {
      console.log(err);
      alert('Error fetching liked products');
    });
  }, []) // Only run on mount, not when products change 

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
    return false;
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
    return false;
  })
  setCproducts(filteredProducts)
  }




const handleProducts= (id)=>{
  navigate('/product/'+id)
}
const handleDislike = async (productId) => {
  let userId = localStorage.getItem("userId");
  if (!userId) {
    toast.error('Please login first to unlike products');
    return;
  }

  try {
    const url = API_ENDPOINTS.DISLIKE_PRODUCT;
    const data = { userId, productId };

    const res = await axios.post(url, data);
    
    if (res.data.message) {
      toast.success('Product removed from favorites!');
      
      // Update both products and likedproducts state to remove the disliked product
      setProducts(prevProducts => prevProducts.filter(item => item._id !== productId));
      setLikedproducts(prevLikedProducts => prevLikedProducts.filter(item => item._id !== productId));
      setCproducts(prevCproducts => prevCproducts.filter(item => item._id !== productId));
    }
  } catch(err) {
    console.log(err);
    toast.error('Failed to remove product from favorites. Please try again.');
  }
}

  return (
    <div>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>
      <div className='d-flex justify-content-center flex-wrap'>
      {cproducts && cproducts.length>0 &&
         cproducts.map((item,index)=>{
           return(
             <div key={item._id} className='card m-4 carrdd'>
            <div className='icon-cont'>
                 {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                        <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>) : (
                             <FaHeart className='icon' />
                                   )}
                  </div>            
            <img onClick = {()=>handleProducts(item._id)} className='product-image' src={getImageUrl(item.pimage)} alt={item.pname}/>
            <div className='card-content'>
              <span className='category-badge'>{item.pcategory}</span>
              <h3 className='namee-text'>{item.pname}</h3>
              <p className='pricee-text'>₹{item.price}</p>
              <p className='descc'>{item.pdesc.length > 50 ? item.pdesc.substring(0, 50) + '...' : item.pdesc}</p>
            </div>             </div>
          )
        })
      }
      </div>
      <div className='d-flex justify-content-center flex-wrap'>
      {products && products.length>0 &&
         products.map((item,index)=>{
          return(
            <div key={item._id} className='card m-4 carrdd'>
           <div className='icon-cont'>
              {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                        <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>): (
                             <FaHeart className='icon' />
                                   )}
                  </div>           
             <img onClick = {()=>handleProducts(item._id)} className='product-image' src={getImageUrl(item.pimage)} alt={item.pname}/>
            <div className='card-content'>
              <span className='category-badge'>{item.pcategory}</span>
              <h3 className='namee-text'>{item.pname}</h3>
              <p className='pricee-text'>₹{item.price}</p>
              <p className='descc'>{item.pdesc.length > 50 ? item.pdesc.substring(0, 50) + '...' : item.pdesc}</p>
            </div>             </div>
          )
         })
      }
      </div>
    </div>
  )
  
}

export default LikedProduct
