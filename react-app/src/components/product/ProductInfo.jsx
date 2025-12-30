import React from 'react';
import './ProductInfo.css';

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-info-section">
      <div className="product-header">
        <span className="product-category-badge">{product.pcategory}</span>
        <h1 className="product-title">{product.pname}</h1>
      </div>

      <div className="product-price-section">
        <span className="price-label">Price</span>
        <div className="price-value">{product.price}</div>
      </div>

      <div className="product-description-section">
        <h3 className="section-title">Description</h3>
        <p className="product-description">{product.pdesc}</p>
      </div>
    </div>
  );
};

export default ProductInfo;

