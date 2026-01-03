import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import './MyDetails.css';
import { API_ENDPOINTS } from '../config/api';
import Loader from './Loader';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
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
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <Header />
                <Loader message="Loading profile..." />
            </div>
        );
    }

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
            {!user && !loading && (
                <div className="profile-loading">
                    <p>No profile data found</p>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
