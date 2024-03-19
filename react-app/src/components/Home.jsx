import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const [products,setProducts] = useState([]);
  const [likedproducts,setLikedproducts] = useState([]);
  const [cproducts,setCproducts] = useState([]);
  const [search,setSearch] = useState('');
  const [issearch,setIssearch] = useState(false);


  // useEffect(()=>{
  //   if(!localStorage.getItem('token')){
  //     navigate('/login')
  //   }
  // },[])

  useEffect(()=>{
    const url = "http://localhost:5000/get-products";
   axios.get(url)
   .then((res)=>{
    // console.log(res);
    if(res.data.product){
      setProducts(res.data.product);
    }
   })
   .catch((err)=>{
    // console.log(err)
    alert('error78in products')
   })

   const url2 = "http://localhost:5000/liked-products";
const userId = localStorage.getItem('userId');
// console.log(us`erId,"polo");
axios.get(url2, {
  headers: {
    "x-auth-token": userId
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

  const handleClick = () => {
    const url = "http://localhost:5000/search?search=" + search;
    axios.get(url)
        .then((res) => {
            // console.log(res.data,"pprrooducts");
            setCproducts(res.data.products);
            setIssearch(true);
        })
        .catch((err) => {
            // console.log(err);
            alert('error.5200in search');
        });
};


  //  const handleLocationsearch = ()=>{
  //   const url = "http://localhost:5000/search?search=" + search+'&loc='+localStorage.getItem('userLoc');
  //  axios.get(url)
  //  .then((res)=>{
  //   console.log(res.data)
  //    setCproducts(res.data.products)
  //    setIssearch(true);
  //  })
  //  .catch((err)=>{
  //   console.log(err)
  //   alert('error..in lol search')
  //  })
  // }

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


 const handleLike =(productId)=>{
   let userId = localStorage.getItem("userId");
  //  console.log(userId,productId,"uuuu");
   if(!userId){
    alert(' Please login first');
    return;
   }
    const url = "http://localhost:5000/like-products";
    const data = {userId,productId}
   axios.post(url,data)
   .then((res)=>{
    if(res.data.message){
      alert("liked")
      setRefresh(!refresh);
    }
   })
   .catch((err)=>{
    console.log(err)
    alert('error..in products')
   })
  
}

const handleDislike =(productId)=>{
  let userId = localStorage.getItem("userId");
 //  console.log(userId,productId,"uuuu");
  if(!userId){
   alert(' Please login first');
   return;
  }
   const url = "http://localhost:5000/dislike-products";
   const data = {userId,productId}
  axios.post(url,data)
  .then((res)=>{
   if(res.data.message){
     alert("disliked")
     setRefresh(!refresh);
   }
  })
  .catch((err)=>{
   console.log(err)
   alert('error..in products')
  })
 
}

const handelclear = ()=>{
  // console.log('xxx')
  navigate('/');
  setIssearch(false);
}

const handleProducts= (id)=>{
    navigate('/product/'+id)
}

  return (
    <div>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>
      {issearch && cproducts && cproducts.length > 0 && <h3>Search Results
        <button className='clear-btn' onClick={handelclear}>Clear</button>
        </h3>}
      {issearch && cproducts && cproducts.length === 0 && <h3>No Result Found</h3>}

     {issearch && <div className='d-flex justify-content-center flex-wrap'>
      {cproducts && cproducts.length>0 &&
         cproducts.map((item,index)=>{
           return(
             <div key={item._id} className='card m-4'>
              <div className='icon-cont'>
              {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                           <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>) : (
                      <FaHeart onClick={() => handleLike(item._id)} className='icon' />)}
                        </div>

            <img onClick = {()=>handleProducts(item._id)} width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
            <p className=' m-2'> {item.pname} | {item.pcategory}</p>
            <p className=' m-2 price-text'> ₹ {item.price}</p>
            <p className=' m-2  text-success'> {item.pdesc}</p>
             </div>
          )
        })
      }
      </div>}

      {!issearch && <div className='d-flex justify-content-center flex-wrap'>
      {products && products.length>0 &&
         products.map((item,index)=>{
          return(
            <div key={item._id} className='card m-4'>
              <div  className='icon-cont'>
              {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                       <FaHeart onClick={()=>handleDislike(item._id)} className='red-icon'/>) : (
                             <FaHeart onClick={()=>handleLike(item._id)} className='icon' />
                                   )}
                  </div>
            <img onClick = {()=>handleProducts(item._id)} width='300px'height='300px' src={'http://localhost:5000/' + item.pimage}/>
            <p className='m-2'> {item.pname} | {item.pcategory}</p>
            <p className='m-2 price-text'> ₹ {item.price}</p>
            <p className='m-2  text-success'> {item.pdesc}</p>
             </div>
          )
         })
      }
      </div>}
    </div>
  )
  
}

export default Home
