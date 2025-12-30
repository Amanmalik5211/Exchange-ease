import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import io from "socket.io-client";
import "./ProductDetail.css";
import { API_ENDPOINTS, SOCKET_CONFIG, getImageUrl } from '../config/api';

const ProductDetail = () => {
  const params = useParams();
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [product, setProduct] = useState();
  const [user, setUser] = useState();
  const chatMessagesRef = useRef(null);
  const previousMsgsLengthRef = useRef(0);

  // Helper function to check if user is near bottom of chat
  const isNearBottom = (element) => {
    if (!element) return false;
    const threshold = 150; // pixels from bottom
    return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
  };

  // Helper function to scroll to bottom
  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const handelMsgsend = () => {
    if (socket) {
      if (msg.trim() !== "") {
        const data = {
          username: localStorage.getItem("userName"),
          msg: msg,
          ProductId: localStorage.getItem("ProductId"),
        };
        socket.emit("sendMsg", data);
        setMsg("");
        // Always scroll to bottom when user sends a message
        setTimeout(scrollToBottom, 100);
      } else {
        console.error("Message cannot be blank");
      }
    } else {
      console.error("Socket is not initialized");
    }
  };

  useEffect(() => {
    const socketInstance = io(SOCKET_CONFIG.URL, SOCKET_CONFIG.OPTIONS);
    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setSocket(socketInstance);
    });
  }, []);

  // Only recreate socket when product changes, not when msgs changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const socketInstance = io(SOCKET_CONFIG.URL, SOCKET_CONFIG.OPTIONS);
    socketInstance.on("getMsg", (data) => {
      if (product && product._id) {
        const _data = data.filter((item, index) => {
          return item.ProductId === localStorage.getItem("ProductId");
        });
        const previousLength = previousMsgsLengthRef.current;
        setMsgs(_data);
        previousMsgsLengthRef.current = _data.length;
        // Only auto-scroll if user is near bottom or if it's a new message from someone else
        setTimeout(() => {
          if (chatMessagesRef.current) {
            // If new message arrived (length increased), check if we should scroll
            if (_data.length > previousLength) {
              // Only scroll if user is already near the bottom
              if (isNearBottom(chatMessagesRef.current)) {
                scrollToBottom();
              }
            }
          }
        }, 100);
      }
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [product]);

  // Auto-scroll on initial load only
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (msgs && msgs.length > 0 && chatMessagesRef.current) {
      // Only scroll on initial load, not on every update
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [product?._id]); // Only run when product changes, not when msgs changes

  useEffect(() => {
    const url = API_ENDPOINTS.GET_PRODUCT_BY_ID(params.productid);
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
          localStorage.setItem("ProductId", res.data.product._id);
          // Automatically fetch contact details
          if (res.data.product.addBy) {
            const userId = typeof res.data.product.addBy === 'object' 
              ? res.data.product.addBy.toString() 
              : res.data.product.addBy;
            const userUrl = API_ENDPOINTS.GET_USER(userId);
            axios
              .get(userUrl)
              .then((userRes) => {
                if (userRes.data && userRes.data.user) {
                  setUser(userRes.data.user);
                }
              })
              .catch((err) => {
                console.error("Error fetching user details:", err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("errorin product details");
      });
  }, [params.productid]);


  return (
    <div className="product-detail-page">
      <Header />

      {product && (
        <div className="product-detail-container">
          {/* Left Section - Images */}
          <div className="product-images-section">
            <div className="main-image-wrapper">
              <img
                className="main-image"
                src={getImageUrl(product.pimage)}
                alt={product.pname}
              />
            </div>
            {product.pimage2 && (
              <div className="secondary-image-wrapper">
                <img
                  className="secondary-image"
                  src={getImageUrl(product.pimage2)}
                  alt={product.pname + " - View 2"}
                />
              </div>
            )}
          </div>

          {/* Center Section - Product Details */}
          <div className="product-info-section">
            <div className="product-header">
              <span className="product-category-badge">{product.pcategory}</span>
              <h1 className="product-title">{product.pname}</h1>
            </div>

            <div className="product-price-section">
              <span className="price-label">Price</span>
              <div className="price-value">{product.price}</div>
            </div>

            <div className="product-description-section">
              <h3 className="section-title">Description</h3>
              <p className="product-description">{product.pdesc}</p>
            </div>

        
            {product.addBy && (
              <div className="contact-section">
                <div className="contact-info-card">
                  <h3 className="contact-title">Seller Contact Information</h3>
                  {user ? (
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
                  ) : (
                    <div className="contact-loading">Loading contact information...</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Section - Chat */}
          <div className="chat-section">
            <div className="chat-header">
              <div className="chat-header-content">
                <div className="chat-header-text">
                  <h3 className="chat-title">Product Discussion</h3>
                  <p className="chat-subtitle">Group chat for this product</p>
                </div>
              </div>
              {msgs && msgs.length > 0 && (
                <div className="chat-meta">
                  <span className="message-count">{msgs.length} {msgs.length === 1 ? 'message' : 'messages'}</span>
                </div>
              )}
            </div>
            <div className="chat-messages" ref={chatMessagesRef}>
              {msgs && msgs.length > 0 ? (
                msgs.map((item, index) => {
                  const isOwnMessage = item.username === localStorage.getItem("userName");
                  return (
                    <div key={index} className={`chat-message ${isOwnMessage ? 'own-message' : 'other-message'}`}>
                      <div className="message-header">
                        <div className="message-username">{item.username}</div>
                        {isOwnMessage && <span className="you-badge">You</span>}
                      </div>
                      <div className="message-text">{item.msg}</div>
                    </div>
                  );
                })
              ) : (
                <div className="no-messages">
                  <p className="no-messages-title">No messages yet</p>
                  <p className="no-messages-desc">Be the first to start the conversation! All interested buyers can see and reply to messages here.</p>
                </div>
              )}
            </div>
            <div className="chat-input-container">
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handelMsgsend();
                  }
                }}
                className="chat-input"
                type="text"
                placeholder="Type your message."
              />
              <button 
                onClick={handelMsgsend} 
                className="chat-send-btn"
                disabled={!msg.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
