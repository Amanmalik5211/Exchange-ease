import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

export const useProducts = (refresh = false) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.GET_PRODUCTS);
        if (response.data.product) {
          setProducts(response.data.product);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [refresh]);

  return { products, loading, error };
};

export const useLikedProducts = (refresh = false) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setLikedProducts([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(API_ENDPOINTS.LIKED_PRODUCTS, {
          headers: {
            "x-auth-token": userId
          }
        });

        if (response.data.products) {
          setLikedProducts(response.data.products.likedProducts || []);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching liked products:', err);
        setError('Failed to fetch liked products');
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProducts();
  }, [refresh]);

  return { likedProducts, loading, error };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINTS.GET_PRODUCT_BY_ID(productId));
        if (response.data.product) {
          setProduct(response.data.product);
          localStorage.setItem("ProductId", response.data.product._id);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

