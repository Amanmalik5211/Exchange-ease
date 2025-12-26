import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
import './MyDetails.css'
const MyDetails = () => {
  const params =useParams()
  console.log(params.productid);
  const [product,setProduct] = useState()
  console.log(product,'jkl11')
  const [user,setUser] = useState()

  useEffect(()=>{
    const url = "http://localhost:5000/get-products/" + params.productid;
   axios.get(url)
   .then((res)=>{
    console.log(res,'0000');
    if(res.data.product){
      setProduct(res.data.product)
      localStorage.setItem('ProductId',res.data.product._id)
    }
   })
   .catch((err)=>{
    console.log(err)
    alert('errorin product details')
   })
  },[])

  return (
  <>
      <Header/>
     {product && <div className='d-flex justify-content'>
        <div className="img-container">
          <div className='img-one'><img src={"http://localhost:5000/"+product.pimage} alt="" /></div>
        <div className='img-two'>  {product.pimage2&&<img src={"http://localhost:5000/"+product.pimage2} alt="" />}</div>
        </div>
         <div className='detail'>
          <h3>Product Details</h3>
            <p className='name'> <span>Name : </span>{product.pname}</p>
            <p className='category'> <span>Category :</span> {product.pcategory}</p>
            <p className='price'> <span>Price :</span> ₹ {product.price}</p>
            <p className='about'><span>About :</span> {product.pdesc}</p>
         </div>
      </div>
      }
    </>
  )
}
export default MyDetails
