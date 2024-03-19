import React from 'react'
import Pcategory from './Pcategory'
import "./Header.css";
import { useNavigate } from 'react-router-dom';
const Categoriess = (props) => {
  const navigate = useNavigate();
  return (
    <div className='cat-container'>
    <div>
    <span>All Categories</span>
        {Pcategory && Pcategory.length>0 && 
        Pcategory.map((item,index)=>{
            return(
            <span key = {index} className='category'
              onClick={()=>navigate('/category/'+item)}>{item}</span>
            )
        })}
    </div>
     </div>
  )
}

export default Categoriess
