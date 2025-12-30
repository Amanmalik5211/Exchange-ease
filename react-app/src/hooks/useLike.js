import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../config/api';

export const useLike = (onSuccess) => {
  const [loading, setLoading] = useState(false);

  const likeProduct = async (productId) => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      toast.error('Please login first to like products');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.LIKE_PRODUCT, {
        userId,
        productId
      });

      if (response.data.message) {
        toast.success('Product added to favorites!');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error('Error liking product:', err);
      toast.error('Failed to like product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const dislikeProduct = async (productId) => {
    const userId = localStorage.getItem("userId");
    
    if (!userId) {
      toast.error('Please login first to unlike products');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_ENDPOINTS.DISLIKE_PRODUCT, {
        userId,
        productId
      });

      if (response.data.message) {
        toast.success('Product removed from favorites!');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error('Error disliking product:', err);
      toast.error('Failed to unlike product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { likeProduct, dislikeProduct, loading };
};

