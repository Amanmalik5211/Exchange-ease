import React, { useEffect, useState } from 'react';
import Header from './Header';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { toast } from 'react-toastify';

const CategoryPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [cproducts, setCproducts] = useState([]);
  const [search, setSearch] = useState('');
  const [issearch, setIssearch] = useState(false);
  const [likedproducts, setLikedproducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const url = "http://localhost:5000/get-products?catName=" + params.catName;
    axios.get(url)
      .then((res) => {
        console.log(res);
        if (res.data.product) {
          setProducts(res.data.product);
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error in products');
      });

    const url2 = "http://localhost:5000/liked-products";
    const userId = localStorage.getItem('userId');
    if (userId) {
      axios.get(url2, {
        headers: {
          "x-auth-token": userId
        }
      })
      .then((res) => {
        if (res.data.products) {
          setLikedproducts(res.data.products.likedProducts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [params.catName, refresh]);

  const handleSearch = (value) => {
    setSearch(value);
  };

  const handleClick = () => {
    const url = "http://localhost:5000/search?search=" + search;
    axios.get(url)
        .then((res) => {
            console.log(res.data);
            setCproducts(res.data.products);
            setIssearch(true);
        })
        .catch((err) => {
            console.log(err);
            alert('error.5200in search');
        });
  };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      if (item.pcategory === value) {
        return item;
      }
      return false;
    });
    setCproducts(filteredProducts);
    setIssearch(true);
  };

  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error('Please login first to like products');
      return;
    }
    const url = "http://localhost:5000/like-products";
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast.success('Product added to favorites!');
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to like product. Please try again.');
      });
  };

  const handleDislike = (productId) => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error('Please login first to unlike products');
      return;
    }
    const url = "http://localhost:5000/dislike-products";
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast.success('Product removed from favorites!');
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Failed to unlike product. Please try again.');
      });
  };

  const handleProducts = (id) => {
    navigate('/product/' + id);
  };

  const handleclear = () => {
    navigate('/category/' + params.catName);
    setIssearch(false);
  };

  return (
    <div className='home-page'>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
      <Categoriess handleCategory={handleCategory} />
      
      {issearch && cproducts && cproducts.length > 0 && (
        <h3 className='search-result'>
          Search Results
          <button className='clear-btn' onClick={handleclear}>Clear</button>
        </h3>
      )}
      
      {issearch && cproducts && cproducts.length === 0 && (
        <div className='search-noresult'>
          <div className='empty-state-text'>No products found</div>
          <p style={{fontSize: '14px', marginTop: '10px', color: '#9ca3af'}}>Try different search terms or browse all categories</p>
        </div>
      )}

      {issearch && (
        <div className='products-container'>
          {cproducts && cproducts.length > 0 &&
            cproducts.map((item, index) => (
              <div key={item._id} className='cardd' style={{animationDelay: `${index * 0.1}s`}}>
                <div className='icon-cont'>
                  {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                    <FaHeart onClick={() => handleDislike(item._id)} className='red-icon' />
                  ) : (
                    <FaHeart onClick={() => handleLike(item._id)} className='icon' />
                  )}
                </div>
                <img 
                  onClick={() => handleProducts(item._id)} 
                  className='product-image' 
                  src={'http://localhost:5000/' + item.pimage} 
                  alt={item.pname}
                />
                <div className='card-content'>
                  <span className='category-badge'>{item.pcategory}</span>
                  <h3 className='name-text'>{item.pname}</h3>
                  <p className='price-text'>{item.price}</p>
                  <p className='desc'>{item.pdesc}</p>
                  <button 
                    className='view-details-btn'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProducts(item._id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {!issearch && (
        <div className='products-container'>
          {products && products.length > 0 ? (
            products.map((item, index) => (
              <div key={item._id} className='cardd' style={{animationDelay: `${index * 0.05}s`}}>
                <div className='icon-cont'>
                  {likedproducts.find(likedItem => likedItem._id === item._id) ? (
                    <FaHeart onClick={() => handleDislike(item._id)} className='red-icon' />
                  ) : (
                    <FaHeart onClick={() => handleLike(item._id)} className='icon' />
                  )}
                </div>
                <img 
                  onClick={() => handleProducts(item._id)} 
                  className='product-image' 
                  src={'http://localhost:5000/' + item.pimage} 
                  alt={item.pname}
                />
                <div className='card-content'>
                  <span className='category-badge'>{item.pcategory}</span>
                  <h3 className='name-text'>{item.pname}</h3>
                  <p className='price-text'>{item.price}</p>
                  <p className='desc'>{item.pdesc}</p>
                  <button 
                    className='view-details-btn'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProducts(item._id);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className='empty-state'>
              <div className='empty-state-text'>No products available in this category</div>
              <p style={{fontSize: '14px', marginTop: '10px', color: '#9ca3af'}}>Check back later for new products!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
