import React from 'react';
import { getImageUrl } from '../../config/api';
import './ProductImages.css';

const ProductImages = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-images-section">
      <div className="main-image-wrapper">
        <img
          className="main-image"
          src={getImageUrl(product.pimage)}
          alt={product.pname}
        />
      </div>
      {product.pimage2 && (
        <div className="secondary-image-wrapper">
          <img
            className="secondary-image"
            src={getImageUrl(product.pimage2)}
            alt={product.pname + " - View 2"}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImages;

