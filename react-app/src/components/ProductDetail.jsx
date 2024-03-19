import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
const ProductDetail = () => {
  const params =useParams()
  console.log(params.productid);
     
  const [product,setProduct] = useState()
  const [user,setUser] = useState()

  useEffect(()=>{
    const url = "http://localhost:5000/get-products/" + params.productid;
   axios.get(url)
   .then((res)=>{
    console.log(res,'0000');
    if(res.data.product){
      setProduct(res.data.product)
    }
   })
   .catch((err)=>{
    console.log(err)
    alert('errorin product details')
   })
  },[])

  const handelContect = (addBy)=>{
      console.log('id',addBy);
      const url = "http://localhost:5000/get-user/" + addBy;
      axios.get(url)
      .then((res)=>{
       console.log(res,'0000');
       if(res.data.user){
         setUser(res.data.user)
       }
      })
      .catch((err)=>{
       console.log(err)
       alert('errorin product userr details')
      })
  }
  return (<>
      <Header/>
     {product && <div className='d-flex justify-content flex-wrap'>
        <div>
          <img height='450px' width='400px' src={"http://localhost:5000/"+product.pimage} alt="" />
          {product.pimage2&&<img height='450px' width='400px' src={"http://localhost:5000/"+product.pimage2} alt="" />}
        </div>
         <div>
          <h3>Product Details</h3>
         <p className=' m-2'> {product.pname} | {product.pcategory}</p>
            <p className=' m-2 price-text'> ₹ {product.price}</p>
            <p className=' m-2  text-success'> {product.pdesc}</p>
           { product.addBy && <button onClick={()=>handelContect(product.addBy)}>
              SHOW CONTECT DETAILS</button>}
              {user && user.username && <h3>{user.username}</h3>}
              {user && user.email && <h5>{user.email}</h5>}
              {user && user.mobile && <h5>{user.mobile}</h5>}
         </div>
      </div>}
    
    </>
  )
}

export default ProductDetail
