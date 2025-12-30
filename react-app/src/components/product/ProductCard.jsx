import React from 'react';
import { FaHeart } from "react-icons/fa6";
import { getImageUrl } from '../../config/api';
import './ProductCard.css';

const ProductCard = ({ 
  product, 
  isLiked, 
  onLike, 
  onDislike, 
  onClick 
}) => {
  return (
    <div className='product-card' onClick={onClick}>
      <div className='icon-cont'>
        {isLiked ? (
          <FaHeart onClick={(e) => {
            e.stopPropagation();
            onDislike(product._id);
          }} className='red-icon' />
        ) : (
          <FaHeart onClick={(e) => {
            e.stopPropagation();
            onLike(product._id);
          }} className='icon' />
        )}
      </div>

      <img 
        className='product-image' 
        src={getImageUrl(product.pimage)} 
        alt={product.pname}
      />
      
      <div className='card-content'>
        <span className='category-badge'>{product.pcategory}</span>
        <h3 className='name-text'>{product.pname}</h3>
        <p className='price-text'>{product.price}</p>
        <p className='desc'>{product.pdesc}</p>
        <button 
          className='view-details-btn'
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

