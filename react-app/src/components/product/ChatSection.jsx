import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { SOCKET_CONFIG } from '../../config/api';
import './ChatSection.css';

const ChatSection = ({ productId }) => {
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const chatMessagesRef = useRef(null);
  const previousMsgsLengthRef = useRef(0);

  const isNearBottom = (element) => {
    if (!element) return false;
    const threshold = 150;
    return element.scrollHeight - element.scrollTop - element.clientHeight < threshold;
  };

  const scrollToBottom = () => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  };

  const handleMsgSend = () => {
    if (socket) {
      if (msg.trim() !== "") {
        const data = {
          username: localStorage.getItem("userName"),
          msg: msg,
          ProductId: localStorage.getItem("ProductId"),
        };
        socket.emit("sendMsg", data);
        setMsg("");
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

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !productId) return;

    const socketInstance = socket;
    socketInstance.on("getMsg", (data) => {
      if (productId) {
        const _data = data.filter((item) => {
          return item.ProductId === localStorage.getItem("ProductId");
        });
        const previousLength = previousMsgsLengthRef.current;
        setMsgs(_data);
        previousMsgsLengthRef.current = _data.length;
        
        setTimeout(() => {
          if (chatMessagesRef.current) {
            if (_data.length > previousLength) {
              if (isNearBottom(chatMessagesRef.current)) {
                scrollToBottom();
              }
            }
          }
        }, 100);
      }
    });

    return () => {
      socketInstance.off("getMsg");
    };
  }, [socket, productId]);

  useEffect(() => {
    if (msgs && msgs.length > 0 && chatMessagesRef.current) {
      const timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 200);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
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
            <span className="message-count">
              {msgs.length} {msgs.length === 1 ? 'message' : 'messages'}
            </span>
          </div>
        )}
      </div>
      
      <div className="chat-messages" ref={chatMessagesRef}>
        {msgs && msgs.length > 0 ? (
          msgs.map((item, index) => {
            const isOwnMessage = item.username === localStorage.getItem("userName");
            return (
              <div 
                key={index} 
                className={`chat-message ${isOwnMessage ? 'own-message' : 'other-message'}`}
              >
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
            <p className="no-messages-desc">
              Be the first to start the conversation! All interested buyers can see and reply to messages here.
            </p>
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
              handleMsgSend();
            }
          }}
          className="chat-input"
          type="text"
          placeholder="Type your message."
        />
        <button 
          onClick={handleMsgSend} 
          className="chat-send-btn"
          disabled={!msg.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSection;

