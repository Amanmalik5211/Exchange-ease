import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import './Home.css'
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';
import ProductGrid from './product/ProductGrid';

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
    const url = API_ENDPOINTS.GET_PRODUCTS;
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

   const url2 = API_ENDPOINTS.LIKED_PRODUCTS;
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
    const url = API_ENDPOINTS.SEARCH_PRODUCTS(search);
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
    return false;
  })
     setCproducts(filteredProducts);
     setIssearch(true);
  }


 const handleLike =(productId)=>{
   let userId = localStorage.getItem("userId");
  //  console.log(userId,productId,"uuuu");
   if(!userId){
    toast.error('Please login first to like products');
    return;
   }
    const url = API_ENDPOINTS.LIKE_PRODUCT;
    const data = {userId,productId}
   axios.post(url,data)
   .then((res)=>{
    if(res.data.message){
      toast.success('Product added to favorites!');
      setRefresh(!refresh);
    }
   })
   .catch((err)=>{
    console.log(err)
    toast.error('Failed to like product. Please try again.');
   })
  
}

const handleDislike =(productId)=>{
  let userId = localStorage.getItem("userId");
 //  console.log(userId,productId,"uuuu");
  if(!userId){
   toast.error('Please login first to unlike products');
   return;
  }
   const url = API_ENDPOINTS.DISLIKE_PRODUCT;
   const data = {userId,productId}
  axios.post(url,data)
  .then((res)=>{
   if(res.data.message){
     toast.success('Product removed from favorites!');
     setRefresh(!refresh);
   }
  })
  .catch((err)=>{
   console.log(err)
   toast.error('Failed to unlike product. Please try again.');
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
    <div className='home-page'>
      <Header search={search} handleSearch={handleSearch} handleClick={handleClick}/>
      <Categoriess handleCategory = {handleCategory}/>

     
      {issearch && cproducts && cproducts.length > 0 && (
        <h3 className='search-result'>
          Search Results
          <button className='clear-btn' onClick={handelclear}>Clear</button>
        </h3>
      )}
      
      {issearch && cproducts && cproducts.length === 0 && (
        <div className='search-noresult'>
          <div className='empty-state-text'>No products found</div>
          <p style={{fontSize: '14px', marginTop: '10px', color: '#9ca3af'}}>Try different search terms or browse all categories</p>
        </div>
      )}

      {issearch ? (
        <ProductGrid
          products={cproducts}
          likedProducts={likedproducts}
          onLike={handleLike}
          onDislike={handleDislike}
          onProductClick={handleProducts}
        />
      ) : (
        <ProductGrid
          products={products}
          likedProducts={likedproducts}
          onLike={handleLike}
          onDislike={handleDislike}
          onProductClick={handleProducts}
        />
      )}
    </div>
  )
  
}

export default Home
