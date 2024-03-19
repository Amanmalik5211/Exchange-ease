import React, { useEffect, useState } from 'react';
import Header from './Header';
import Categoriess from './Categoriess';
import { FaHeart } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const CategoryPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [cproducts, setCproducts] = useState([]);
  const [search, setSearch] = useState('');
  const [issearch, setIssearch] = useState(false);

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
  }, [params.catName]);

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


  // const handleLocationsearch = () => {
  //   const url = "http://localhost:5000/search?search=" + search + '&loc=' + localStorage.getItem('userLoc');
  //   axios.get(url)
  //     .then((res) => {
  //       console.log(res.data);
  //       setCproducts(res.data.products);
  //       setIssearch(true);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert('error..in lol search');
  //     });
  // };

  const handleCategory = (value) => {
    let filteredProducts = products.filter((item, index) => {
      console.log(value, item, 'vv78');
      if (item.pcategory === value) {
        return item;
      }
    });
    setCproducts(filteredProducts);
  };

  const handleLike = (productId) => {
    let userId = localStorage.getItem("userId");
    console.log(userId, productId, "uuuu");
    const url = "http://localhost:5000/like-products";
    const data = { userId, productId };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert("liked");
        }
      })
      .catch((err) => {
        console.log(err);
        alert('error..in products');
      });
  };

  const handleProducts = (id) => {
    navigate('/product/' + id);
  };

  const handleclear = ()=>{
    console.log('xxx')
    navigate('/');
    setIssearch(false);
  }

  return (
    <div>
      <Header
        search={search}
        handleSearch={handleSearch}
        handleClick={handleClick}
      />
      <Categoriess handleCategory={handleCategory} />
      {issearch && cproducts && cproducts.length > 0 && (
        <h3>
          Search Results
          <button className='clear-btn' onClick={handleclear}>Clear</button>
        </h3>
      )}
      {issearch && cproducts && cproducts.length === 0 && <h3>No Result Found</h3>}

      {issearch && (
        <div className='d-flex justify-content-center flex-wrap'>
          {cproducts && cproducts.length > 0 &&
            cproducts.map((item, index) => (
              <div key={item._id} className='card m-4'>
                <div onClick={() => handleLike(item._id)} className='icon-cont'><FaHeart className='icon' /></div>
                <img onClick={() => handleProducts(item._id)} width='300px' height='300px' src={'http://localhost:5000/' + item.pimage} alt={item.pname} />
                <p className='m-2'> {item.pname} | {item.pcategory}</p>
                <p className='m-2 price-text'> ₹ {item.price}</p>
                <p className='m-2 text-success'> {item.pdesc}</p>
              </div>
            ))}
        </div>
      )}

      {!issearch && (
        <div className='d-flex justify-content-center flex-wrap'>
          {products && products.length > 0 &&
            products.map((item, index) => (
              <div key={item._id} className='card m-4'>
                <div onClick={() => handleLike(item._id)} className='icon-cont'><FaHeart className='icon' /></div>
                <img onClick={() => handleProducts(item._id)} width='300px' height='300px' src={'http://localhost:5000/' + item.pimage} alt={item.pname} />
                <p className='m-2'> {item.pname} | {item.pcategory}</p>
                <p className='m-2 price-text'> ₹ {item.price}</p>
                <p className='m-2 text-success'> {item.pdesc}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
