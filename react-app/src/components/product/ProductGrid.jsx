import React from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ 
  products, 
  likedProducts, 
  onLike, 
  onDislike, 
  onProductClick 
}) => {
  if (!products || products.length === 0) {
    return (
      <div className='empty-state'>
        <div className='empty-state-text'>No products available</div>
        <p style={{fontSize: '14px', marginTop: '10px', color: '#9ca3af'}}>
          Be the first to add a product!
        </p>
      </div>
    );
  }

  return (
    <div className='products-container'>
      {products.map((item, index) => {
        const isLiked = likedProducts?.some(likedItem => likedItem._id === item._id);
        return (
          <ProductCard
            key={item._id}
            product={item}
            isLiked={isLiked}
            onLike={onLike}
            onDislike={onDislike}
            onClick={() => onProductClick(item._id)}
            style={{animationDelay: `${index * 0.05}s`}}
          />
        );
      })}
    </div>
  );
};

export default ProductGrid;

