import React, { useState } from "react";
import { useEffect } from "react";
import "./Header.css";
import "./Login";
import logo2 from "./logo2.png";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";
const Header = (props) => {
  const [showOver, setshowOver] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Username = localStorage.getItem("userName");
    console.log(Username, "tttttt");
    if (Username) {
      setUsername(Username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

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
    <div className=" header-container d-flex justify-content-between">
      <div className="header">
        <img className="logoimage" src={logo2} alt="My Image" />
        <Link className="exchange-ease" to="/">
          Exchange Ease
        </Link>
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
        <input
          className="search"
          type="text"
          value={props && props.search}
          onChange={(e) =>
            props.handleSearch && props.handleSearch(e.target.value)
          }
        />
        <button
          className="search-btn"
          onClick={() => props.handleClick && props.handleClick()}
        >
          <FaSearch />
        </button>
      </div>

      <div>
        <div
          className="myprofile"
          onClick={() => {
            setshowOver(!showOver);
          }}
        >
          {username ? username.charAt(0).toUpperCase() : ""}
        </div>
        {showOver && (
          <div className="myprofile-cont">
            <div>
              {localStorage.getItem("token") && (
                <button
                  className="xyz"
                  onClick={() => {
                    window.location.href = "/liked-products";
                  }}
                >
                  FAVOURITES
                </button>
              )}
            </div>
            <div>
              {localStorage.getItem("token") && (
                <button
                  className="xyz"
                  onClick={() => {
                    window.location.href = "/add-product";
                  }}
                >
                  ADD PRODUCT
                </button>
              )}
            </div>
            <div>
              {!localStorage.getItem("token") ? (
                <Link to="/login">lOGIN</Link>
              ) : (
                <button className="xyz" onClick={handleLogout}>
                  LOGOUT
                </button>
              )}
            </div>
            <div>
              {localStorage.getItem("token") && (
                <button
                  className="xyz"
                  onClick={() => {
                    window.location.href = "/my-products";
                  }}
                >
                  MY PRODUCT
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
