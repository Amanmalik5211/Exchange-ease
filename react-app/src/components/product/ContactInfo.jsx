import React from 'react';
import './ContactInfo.css';

const ContactInfo = ({ user }) => {
  if (!user) {
    return (
      <div className="contact-section">
        <div className="contact-info-card">
          <div className="contact-loading">Loading contact information...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-section">
      <div className="contact-info-card">
        <h3 className="contact-title">Seller Contact Information</h3>
        <div className="contact-details">
          {user.username && (
            <div className="contact-item">
              <div className="contact-content">
                <span className="contact-label">Owner Name</span>
                <span className="contact-value">{user.username}</span>
              </div>
            </div>
          )}
          {user.email && (
            <div className="contact-item">
              <div className="contact-content">
                <span className="contact-label">Email</span>
                <span className="contact-value">{user.email}</span>
              </div>
            </div>
          )}
          {user.mobile && (
            <div className="contact-item">
              <div className="contact-content">
                <span className="contact-label">Mobile</span>
                <span className="contact-value">{user.mobile}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

