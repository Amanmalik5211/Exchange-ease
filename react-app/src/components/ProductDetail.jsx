import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./ProductDetail.css";
import { API_ENDPOINTS } from '../config/api';
import ProductImages from './product/ProductImages';
import ProductInfo from './product/ProductInfo';
import ContactInfo from './product/ContactInfo';
import ChatSection from './product/ChatSection';

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const url = API_ENDPOINTS.GET_PRODUCT_BY_ID(params.productid);
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
          localStorage.setItem("ProductId", res.data.product._id);
          // Automatically fetch contact details
          if (res.data.product.addBy) {
            const userId = typeof res.data.product.addBy === 'object' 
              ? res.data.product.addBy.toString() 
              : res.data.product.addBy;
            const userUrl = API_ENDPOINTS.GET_USER(userId);
            axios
              .get(userUrl)
              .then((userRes) => {
                if (userRes.data && userRes.data.user) {
                  setUser(userRes.data.user);
                }
              })
              .catch((err) => {
                console.error("Error fetching user details:", err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("errorin product details");
      });
  }, [params.productid]);

  return (
    <div className="product-detail-page">
      <Header />

      {product && (
        <div className="product-detail-container">
          {/* Left Section - Images */}
          <ProductImages product={product} />

          {/* Center Section - Product Details */}
          <div className="product-details-container">
            <ProductInfo product={product} />
            {product.addBy && <ContactInfo user={user} />}
          </div>

          {/* Right Section - Chat */}
          <ChatSection productId={product._id} />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
