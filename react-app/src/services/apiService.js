import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Product API calls
export const productService = {
  getAll: async (category = null) => {
    const url = category 
      ? API_ENDPOINTS.GET_PRODUCTS_BY_CATEGORY(category)
      : API_ENDPOINTS.GET_PRODUCTS;
    const response = await axios.get(url);
    return response.data;
  },

  getById: async (id) => {
    const response = await axios.get(API_ENDPOINTS.GET_PRODUCT_BY_ID(id));
    return response.data;
  },

  add: async (formData) => {
    const response = await axios.post(API_ENDPOINTS.ADD_PRODUCT, formData);
    return response.data;
  },

  update: async (formData) => {
    const response = await axios.post(API_ENDPOINTS.EDIT_PRODUCT, formData);
    return response.data;
  },

  delete: async (productId, userId) => {
    const response = await axios.post(API_ENDPOINTS.DELETE_PRODUCT, {
      pid: productId,
      userId
    });
    return response.data;
  },

  getMyProducts: async (userId) => {
    const response = await axios.get(API_ENDPOINTS.MY_PRODUCTS(userId));
    return response.data;
  },

  search: async (query) => {
    const response = await axios.get(API_ENDPOINTS.SEARCH_PRODUCTS(query));
    return response.data;
  }
};

// User API calls
export const userService = {
  getProfile: async (userId) => {
    const response = await axios.get(API_ENDPOINTS.MY_PROFILE(userId));
    return response.data;
  },

  getUser: async (userId) => {
    const response = await axios.get(API_ENDPOINTS.GET_USER(userId));
    return response.data;
  },

  getLikedProducts: async () => {
    const userId = localStorage.getItem('userId');
    const response = await axios.get(API_ENDPOINTS.LIKED_PRODUCTS, {
      headers: {
        "x-auth-token": userId
      }
    });
    return response.data;
  }
};

// Auth API calls
export const authService = {
  login: async (email, password) => {
    const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
    return response.data;
  },

  signup: async (username, email, password, mobile) => {
    const response = await axios.post(API_ENDPOINTS.SIGNUP, {
      username,
      email,
      password,
      mobile
    });
    return response.data;
  }
};

// Like API calls
export const likeService = {
  like: async (productId, userId) => {
    const response = await axios.post(API_ENDPOINTS.LIKE_PRODUCT, {
      productId,
      userId
    });
    return response.data;
  },

  dislike: async (productId, userId) => {
    const response = await axios.post(API_ENDPOINTS.DISLIKE_PRODUCT, {
      productId,
      userId
    });
    return response.data;
  }
};

