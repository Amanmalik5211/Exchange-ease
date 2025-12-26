import React, { useState } from 'react';
import axios from 'axios'; // for making HTTP requests

const DeleteUser = ({ userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const deleteUser = async () => {
    setIsLoading(true);
    try {
      // Send a request to your backend to delete the user profile
      await axios.delete(`/api/users/${userId}`);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (success) {
    return <p>User profile deleted successfully!</p>;
  }

  return (
    <div>
      <button onClick={deleteUser}>Delete Profile</button>
    </div>
  );
};

export default DeleteUser;
