/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/login`,
  SIGNUP: `${API_BASE_URL}/signup`,
  
  // Products
  GET_PRODUCTS: `${API_BASE_URL}/get-products`,
  GET_PRODUCT_BY_ID: (id) => `${API_BASE_URL}/get-products/${id}`,
  ADD_PRODUCT: `${API_BASE_URL}/add-product`,
  EDIT_PRODUCT: `${API_BASE_URL}/edit-product`,
  DELETE_PRODUCT: `${API_BASE_URL}/delete-product`,
  SEARCH_PRODUCTS: (query) => `${API_BASE_URL}/search?search=${query}`,
  GET_PRODUCTS_BY_CATEGORY: (category) => `${API_BASE_URL}/get-products?catName=${category}`,
  
  // User Products
  MY_PRODUCTS: (userId) => `${API_BASE_URL}/my-products?userId=${userId}`,
  MY_PROFILE: (userId) => `${API_BASE_URL}/my-profile/${userId}`,
  
  // Likes
  LIKE_PRODUCT: `${API_BASE_URL}/like-products`,
  DISLIKE_PRODUCT: `${API_BASE_URL}/dislike-products`,
  LIKED_PRODUCTS: `${API_BASE_URL}/liked-products`,
  
  // User
  GET_USER: (userId) => `${API_BASE_URL}/get-user/${userId}`,
};

// Image URL helper
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  return `${API_BASE_URL}/${imagePath}`;
};

// Socket Configuration
export const SOCKET_CONFIG = {
  URL: SOCKET_URL,
  OPTIONS: {
    transports: ['websocket', 'polling'],
  },
};

// App Configuration
export const APP_CONFIG = {
  NAME: process.env.REACT_APP_APP_NAME || 'Exchange Ease',
  VERSION: process.env.REACT_APP_APP_VERSION || '1.0.0',
};

// Toast Configuration
export const TOAST_CONFIG = {
  AUTO_CLOSE: parseInt(process.env.REACT_APP_TOAST_AUTO_CLOSE) || 3000,
  POSITION: process.env.REACT_APP_TOAST_POSITION || 'top-right',
};

const apiConfig = {
  API_BASE_URL,
  SOCKET_URL,
  API_ENDPOINTS,
  getImageUrl,
  SOCKET_CONFIG,
  APP_CONFIG,
  TOAST_CONFIG,
};

export default apiConfig;

