import React, { useState } from 'react'
import "./Header.css";
import "./Login"
import { FaSearch } from "react-icons/fa";
import { Link,useNavigate } from 'react-router-dom'
const Header = (props) => {
const [showOver,setShowOver]=useState(false);
  // const [loc , setLoc] = useState('');
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login')
  }

  const handleClick = () => {
    setShowOver(!showOver);
  };

  function UserProfile({ photoUrl }) {
    return (
      <img src={photoUrl} alt="Profile" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
    );
  }

  const userProfilePhotoUrl = 'http://localhost:5000/api/upload'

  // let locations=[
  // {
  //   'latitude':28.6139,
  //   'longitude':77.2090,
  //   'placeName':"New Delhi,Delhi"
  // },
  // {
  //   'latitude':19.0760,
  //   'longitude':72.8777,
  //   'placeName':"Mumbai,Maharashtra"
  // }

  // ]
  return (
    
    <div className=' header-container d-flex justify-content-between'>
    <div className="header">
      <Link className='exchange-ease' to ='/'>Exchange Ease</Link>
       {/* <select value = {loc} onChange={(e)=>{
        localStorage.setItem('userLoc',e.target.value)
        setLoc(e.target.value)
        }}>
     {locations.map((item,index)=>{
      return(
        <option key={index} value={`${item.latitude},${item.longitude}`}>
          {item.placeName}
        </option>
      )
     })}
       </select> */}
      <input className='search' type='text' value={props && props.search} 
      onChange={(e)=>props.handleSearch && props.handleSearch(e.target.value)}/>
      <button className='search-btn' onClick={()=>props.handleClick && props.handleClick()}><FaSearch /></button>
    </div>

  <div>
 {/* <div onClick={()=>{setshowOver(!showOver)}}style={{width:'40px',
            height:'40px',
            borderRadius:"50%",
            backgroundColor:"blue",
            display:"flex",
            justifyContent:'center',
            alignItems:"center"}}>A</div>
  */}
  <div onClick={handleClick} style={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'blue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}></div>

{showOver && <UserProfile photoUrl={userProfilePhotoUrl} />}
    </div>
 {/* { showOver && <div style={{
          width:'200px',
          minHeight:'100px',
          backgroundColor:'red',
          position:'absolute',
          top:'0',
          right:'0',
          zIndex:1,
          color:'red',
          fontSize:'14px',
          marginTop:'50px',
          marginRight:'50px',
         }}>
  <div>{localStorage.getItem('token') && <button className='xyz add-product' onClick={() => { window.location.href = '/liked-products' }}>Favourites</button>}</div>
  <div>{localStorage.getItem('token') && <button className='xyz add-product' onClick={() => { window.location.href = '/add-product' }}>Add Product</button>}</div>
  <div>{!localStorage.getItem('token')?<Link to='/login'>lOGIN</Link>:<button className='xyz logout' onClick={handleLogout}>LOGOUT</button>}</div>
  <div>{localStorage.getItem('token') && <button className='xyz add-product' onClick={() => { window.location.href = '/my-products' }}>My Product</button>}</div>
</div>} */}

  </div> 
    // </div>
    
  )
}

export default Header
