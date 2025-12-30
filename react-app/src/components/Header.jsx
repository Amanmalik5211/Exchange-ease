import React, { useState } from "react";
import { useEffect } from "react";
import "./Header.css";
import "./Login";
import logo2 from "./logo2.png";
import { FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Pcategory from "./Pcategory";

const Header = (props) => {
  const [showOver, setshowOver] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Username = localStorage.getItem("userName");
    console.log(Username, "tttttt");
    if (Username) {
      setUsername(Username);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCategories && !event.target.closest('.category-icon-btn') && !event.target.closest('.category-dropdown')) {
        setShowCategories(false);
      }
      if (showOver && !event.target.closest('.myprofile') && !event.target.closest('.myprofile-cont')) {
        setshowOver(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategories, showOver]);

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
        <img className="logoimage" src={logo2} alt="Exchange Ease Logo" />
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
        
        {/* Category Icon for Small/Medium Screens */}
        <button
          className="category-icon-btn"
          onClick={() => setShowCategories(!showCategories)}
          aria-label="Categories"
        >
          <FaList />
        </button>
        
        {/* Category Dropdown */}
        {showCategories && (
          <div className="category-dropdown">
            <button
              className="category-item"
              onClick={() => {
                navigate('/');
                setShowCategories(false);
              }}
            >
              All Categories
            </button>
            {Pcategory && Pcategory.length > 0 && (
              Pcategory.map((item, index) => (
                <button
                  key={index}
                  className="category-item"
                  onClick={() => {
                    navigate(`/category/${item}`);
                    setShowCategories(false);
                  }}
                >
                  {item}
                </button>
              ))
            )}
          </div>
        )}
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
          <div className="myprofile-cont" onClick={(e) => e.stopPropagation()}>
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
