import React, { useState } from 'react'
import Pcategory from './Pcategory'
import "./Home.css";
import { useNavigate } from 'react-router-dom';
const Categoriess = (props) => {
  const navigate = useNavigate();
  const[allproduct,SetAllproduct]=useState('');
  const handelcat = ()=>{
    SetAllproduct(
      navigate('/')
    )
  }
  return (
    <div className='cat-container'>
    <div>
    <span value={allproduct} onClick={handelcat}><button className='c-btn-all'>All Categories</button></span>
        {Pcategory && Pcategory.length>0 && 
        Pcategory.map((item,index)=>{
            return(
            <span key = {index} 
              onClick={()=>navigate('/category/'+item)}><button className='c-btn'>{item}</button></span>
            )
        })}
    </div>
     </div>
  )
}

export default Categoriess
