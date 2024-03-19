import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import './Home.css'

const MyProducts = () => {
  // const navigate = useNavigate();
  const [products,setProducts] = useState([]);
  const [cproducts,setCproducts] = useState([]);
  const [search,setSearch] = useState('');


  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/login')
  //   }
  // },[])

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:5000/my-products?userId=${userId}`;
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
  })
  setCproducts(filteredProducts)
  }

  const handleCategory = (value)=>{
    let filteredProducts = products.filter((item,index)=>{ 
     console.log(value,item,'vv78');
    if (item.pcategory===value){
      return item;
      console.log(item);
    }
  })
  setCproducts(filteredProducts)
  }


 const handleLike =(productId)=>{
   let userId = localStorage.getItem("userId");
   console.log(userId,productId,"uuuu");
    const url = "http://localhost:5000/like-products";
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
const url = "http://localhost:5000/delete-product";
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
  return (
    <div>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>
      <div className='d-flex justify-content-center flex-wrap'>
      {cproducts && cproducts.length>0 &&
         cproducts.map((item,index)=>{
           return(
             <div key={item._id} className='card m-4'>
              <div onClick={()=>handleLike(item._id)} className='icon-cont'><FaHeart className='icon'/></div>
            <img width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
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

              <div  onClick={()=>handleLike(item._id)} className='icon-cont'><FaHeart className='icon'/></div>
            <img width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
            <p className=' m-2'> {item.pname} | {item.pcategory}</p>
            <p className=' m-2 price-text'> ₹ {item.price}</p>
            <p className=' m-2  text-success'> {item.pdesc}</p>
            <Link to={`/edit-product/${item._id}`}>Edit Product</Link>
            <button onClick={()=>handledelete(item._id)}>Delete Product</button>
             </div>
          )
         })
      }
      </div>
    </div>
  )
  
}

export default MyProducts
