import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import './MyProduct.css'
import { API_ENDPOINTS, getImageUrl } from '../config/api';

const MyProducts = () => {
  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const url = API_ENDPOINTS.MY_PRODUCTS(userId);
  // console.log(userId,'***')
    axios.get(url)
      .then((res) => {
        if (res.data.products) { 
          setProducts(res.data.products); 
          console.log("produc", products); 
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error in my products');
      });
  }, [products]); 
  

  const handleSearch = (value)=>{
     setSearch(value)
  }
  const handleClick = ()=>{
    console.log(products,'swqdxw');
  let filteredProducts = products.filter((item)=>{ 
    if (item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.pcategory.toLowerCase().includes(search.toLowerCase()
    )){
      return item;
    }
    return false;
  })
  // setCproducts(filteredProducts)
  }

  const handleCategory = (value)=>{
    let filteredProducts = products.filter((item,index)=>{ 
     console.log(value,item,'vv78');
    if (item.pcategory===value){
      return item;
    }
    return false;
  })
  // setCproducts(filteredProducts)
  }


 const handleLike =(productId)=>{
   let userId = localStorage.getItem("userId");
   console.log(userId,productId,"uuuu");
    const url = API_ENDPOINTS.LIKE_PRODUCT;
    const data = {userId,productId}
   axios.post(url,data)
   .then((res)=>{
    if(res.data.message){
      alert("liked")
    }
   })
   .catch((err)=>{
    console.log(err)
    alert('error in products')
   })
}

const handledelete=(pid)=>{
const url = API_ENDPOINTS.DELETE_PRODUCT;
const userId =localStorage.getItem('userId')
const data = {userId,pid}
if(!userId){
  alert('login first');
  return;
}
console.log(pid);
axios.post(url,data)
.then((res)=>{
  if(res.data.message){
    alert("Deleted")
  }
 })
 .catch((err)=>{
  console.log(err)
  alert('error in products')
 })
}


const handleProducts= (id)=>{
  navigate('/myproduct/'+id)
}
  return (
    <div>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>
      
      <div className='d-flex justify-content-center flex-wrap'>
      {products && products.length>0 &&
         products.map((item,index)=>{
          return(
            <div key={item._id} className='card m-4 mycard'>
              <div  onClick={()=>handleLike(item._id)} className='icon-cont'><FaHeart className='icon'/></div>
              <img onClick = {()=>handleProducts(item._id)} className='product-image' src={getImageUrl(item.pimage)} alt={item.pname}/>
            <div className='card-content'>
              <span className='category-badge'>{item.pcategory}</span>
              <h3 className='myname'>{item.pname}</h3>
              <p className='myprice'>₹{item.price}</p>
              <p className='mydesc'>{item.pdesc.length > 50 ? item.pdesc.substring(0, 50) + '...' : item.pdesc}</p>
            </div>            
            <div className='edit'><a href={`/edit-product/${item._id}`}>Edit Product</a></div>
            <button className='delete' onClick={()=>handledelete(item._id)}>Delete Product</button>
             </div>
          )
         })
      }
      </div>
    </div>
  )
  
}

export default MyProducts
