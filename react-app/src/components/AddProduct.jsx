import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import Pcategory from './Pcategory';

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

  // const handleProduct = () => {
    // const formData = new FormData();
    // formData.append('pname', pname);
    // formData.append('pdesc', pdesc);
    // formData.append('price', price);
    // formData.append('pcategory', pcategory);
    // formData.append('pimage', pimage);
    // formData.append('pimage2', pimage2);
    // formData.append('userId', localStorage.getItem('userId'));

    // const url = 'http://localhost:5000/add-product'; 
    // axios.post(url, formData)
    //     .then((res) => {
    //         console.log(res);
    //         if(res.data.message){
    //           alert(res.data.message);
    //           navigate('/');
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
// }

const handleProduct = ()=>{
  //navigator hota h jo ki inbuild h or apni live locaton save krta h..
  navigator.geolocation.getCurrentPosition((position)=>{
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
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
              alert(res.data.message);
              navigate('/');
            }
        })
        .catch((err) => {
            console.log(err);
        });
  })
}

  return (
    <>
    <div>
      <Header/>
      <div className='p-3' style={{width: '80rem', height: '60rem'}}>
    <h2>add product here</h2>
    <div>
        <label>Product Name</label>
        <input type="text" value={pname} onChange={(e)=>{setPname(e.target.value)}} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Description</label>
        <input type="text" value={pdesc} onChange={(e)=>{setDesc(e.target.value)}}  className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Price</label>
        <input type="text" value={price} onChange={(e)=>{setPrice(e.target.value)}} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
        
        <label>Product Category</label>
        <select className='form-control' value={pcategory} onChange={(e)=>{setPcategory(e.target.value)}}>
            {/* <option>Bike</option>
            <option>Car</option>
            <option>Phone</option>
            <option>Mobile</option> */}
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
        className="form-control" />
        
        <button onClick={handleProduct} className='btn btn-primary mt-3'>Submit</button>
    </div>
</div>
    </div>
    </>
  )
}

export default AddProduct;
