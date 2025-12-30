import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './MyDetails.css';
import { API_ENDPOINTS } from '../config/api';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState();

    const handleDelete = async (productId) => {
        try {
          await axios.delete(API_ENDPOINTS.DELETE_PRODUCT);
          setProduct(product.filter(product => product._id !== productId));
          console.log('Product deleted successfully');
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const url = API_ENDPOINTS.MY_PROFILE(userId);

        axios.get(url)
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('Error fetching user profile');
            });
    }, []);

    return (
        <div className="profile-page">
            <Header />
            {user && (
                <div className="profile-container">
                    <div className="profile-card">
                        <h2 className="profile-title">My Profile</h2>
                        <div className="profile-info">
                            <div className="profile-item">
                                <span className="profile-label">Username</span>
                                <span className="profile-value">{user.username}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Email</span>
                                <span className="profile-value">{user.email}</span>
                            </div>
                            <div className="profile-item">
                                <span className="profile-label">Mobile</span>
                                <span className="profile-value">{user.mobile}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!user && (
                <div className="profile-loading">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
