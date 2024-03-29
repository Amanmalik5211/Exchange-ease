import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Categoriess from './Categoriess';
import Pcategory from './Pcategory';

const EditProduct = () => {
    const params =useParams()
  console.log(params.pid,"params");
     

  const navigate = useNavigate();
  const[pname,setPname]=useState('');
  const[pdesc,setDesc]=useState('');
  const[price,setPrice]=useState('');
  const[pcategory,setPcategory]=useState('');
  const[pimage,setPimage]=useState('');
  const[pimage2,setPimage2]=useState('');
  const[poldpimage,setPoldpimage]=useState('');
  const[poldpimage2,setPoldpimage2]=useState('');

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  useEffect(()=>{
    const url = "http://localhost:5000/get-products/" + params.pid;
   axios.get(url)
   .then((res)=>{
    // console.log(res,'0000');
    if(res.data.product){
      console.log(res.data.product)
      let product =res.data.product;
      setPname(product.pname)
      setDesc(product.pdesc)
      setPrice(product.price)
      setPcategory(product.pcategory)
      setPoldpimage(product.pimage)
      setPoldpimage2(product.pimage2)
   }})
   .catch((err)=>{
    console.log(err)
    alert('errorin product details')
   })
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
    const formData = new FormData();
    // formData.append('plat', position.coords.latitude);
    // formData.append('plong', position.coords.longitude);
    formData.append('pid', params.pid);
    formData.append('pname', pname);
    formData.append('pdesc', pdesc);
    formData.append('price', price);
    formData.append('pcategory', pcategory);
    formData.append('pimage', pimage);
    formData.append('pimage2', pimage2);
    formData.append('userId', localStorage.getItem('userId'));

    const url = 'http://localhost:5000/edit-product'; 
    axios.post(url, formData)
        .then((res) => {
            console.log(res);
            if(res.data.message){
              alert(res.data.message);
              navigate('/my-products');
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

  return (
    <>
    <div>
      <Header/>
      <div className='p-3' style={{width: '80rem', height: '60rem'}}>
    <h2>Edit product here</h2>
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
        <input type="file" onChange={(e)=>{setPimage(e.target.files[0])}} className="form-control" />
         <img height={50}width={100} src={'http://localhost:5000/'+ poldpimage }/><br></br>
         <input type="file" onChange={(e)=>{setPimage2(e.target.files[0])}} className="form-control" />
         <img height={50}width={100} src={'http://localhost:5000/'+ poldpimage2 }/><br></br>
        <button onClick={handleProduct} className='btn btn-primary mt-3'>Update</button>
    </div>
</div>
    </div>
    </>
  )
}

export default EditProduct;
