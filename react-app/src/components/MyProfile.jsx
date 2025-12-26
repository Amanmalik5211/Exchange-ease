import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [product,setProduct] = useState()
    const handleDelete = async (productId) => {
        try {
          await axios.delete(`http://localhost:5000/products/${productId}`);
          setProduct(product.filter(product => product._id !== productId));
          console.log('Product deleted successfully');
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const url = `http://localhost:5000/my-profile/${userId}`;

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
        <div>
            <Header />
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                </div>
            )}
            {!user && <p>Loading...</p>}
        </div>
    );
};

export default MyProfile;
