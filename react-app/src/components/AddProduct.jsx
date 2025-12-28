import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import Pcategory from './Pcategory';
import './AddProduct.css'
import { toast } from 'react-toastify';
const AddProduct = () => {
  const navigate = useNavigate();
  const[pname,setPname]=useState('');
  const[pdesc,setDesc]=useState('');
  const[price,setPrice]=useState('');
  const[pcategory,setPcategory]=useState('');
  const[pimage,setPimage]=useState('');
  const[pimage2,setPimage2]=useState('');
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
  },[])

const handleProduct = ()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords.latitude);

    const formData = new FormData();
    formData.append('pname', pname);
    formData.append('plat', position.coords.latitude);
    formData.append('plong', position.coords.longitude);
    formData.append('pdesc', pdesc);
    formData.append('price', price);
    formData.append('pcategory', pcategory);
    formData.append('pimage', pimage);
    formData.append('pimage2', pimage2);
    formData.append('userId', localStorage.getItem('userId'));

    const url = 'http://localhost:5000/add-product'; 
    axios.post(url, formData)
        .then((res) => {
            console.log(res);
            if(res.data.message){
              toast.success('Product added successfully!');
              navigate('/');
            }
        })
        .catch((err) => {
            console.log(err);
            toast.error('Failed to add product. Please try again.');
        });
  })
}

  return (
    <>
    <div>
      <Header/>
      <div className='add-box'>
      <div className='add-text-section'>
        <div className='add-text-wrapper'>
          <h1 className='add-main-title'>ADD</h1>
          <h1 className='add-main-title'>PRODUCT</h1>
          <p className='add-subtitle'>Create your listing and reach thousands of buyers</p>
          <div className='add-features'>
            <div className='add-feature-item'>
              <span className='add-feature-icon'>✓</span>
              <span>Easy & Quick Setup</span>
            </div>
            <div className='add-feature-item'>
              <span className='add-feature-icon'>✓</span>
              <span>Multiple Image Upload</span>
            </div>
            <div className='add-feature-item'>
              <span className='add-feature-icon'>✓</span>
              <span>Instant Listing</span>
            </div>
          </div>
        </div>
      </div>
    <div className='add-containerr'>
      <div className="miniadd-containerr">
        <label>Product Name</label>
        <input type="text" value={pname} onChange={(e)=>{setPname(e.target.value)}} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Description</label>
        <input type="text" value={pdesc} onChange={(e)=>{setDesc(e.target.value)}}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Price</label>
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Category</label>
        <select className='form-control' value={pcategory} onChange={(e)=>{setPcategory(e.target.value)}}>
            {Pcategory && Pcategory.length>0 && Pcategory.map((item,index)=>{
              return(
                <option key={'option'+index}>{item}</option>
              )
            })}
        </select>

        <label>Product Image</label>
        <input type="file" onChange={(e)=>{setPimage(e.target.files[0])}} 
        className="form-control" />
         <input type="file" onChange={(e)=>{setPimage2(e.target.files[0])}} 
        className="form-control i2 " />
        
        <button onClick={handleProduct} className='btn btn-primary mt-3'>Submit</button>
    </div>
    </div>
</div>
    </div>
    </>
  )
}

export default AddProduct;
