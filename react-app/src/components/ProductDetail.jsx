import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import io from "socket.io-client";
import "./ProductDetail.css";
const ProductDetail = () => {
  const params = useParams();
  console.log(params.productid);
  const [socket, setSocket] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [product, setProduct] = useState();
  console.log(product, "jkl11");
  const [user, setUser] = useState();

  const handelMsgsend = () => {
    if (socket) {
      if (msg.trim() !== "") {
        const data = {
          username: localStorage.getItem("userName"),
          msg: msg,
          ProductId: localStorage.getItem("ProductId"),
        };
        console.log(data, "data sendd");
        socket.emit("sendMsg", data);
        setMsg("");
      } else {
        console.error("Message cannot be blank");
      }
    } else {
      console.error("Socket is not initialized");
    }
  };

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    socketInstance.on("connect", () => {
      console.log("Connected to server");
      setSocket(socketInstance);
    });
  }, []);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000");
    socketInstance.on("getMsg", (data) => {
      if (product && product._id) {
        // Check if product is defined
        const _data = data.filter((item, index) => {
          return item.ProductId === localStorage.getItem("ProductId"); // Compare ProductId
        });
        setMsgs(_data);
      }
    });

    // Make sure to clean up the socket connection when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, [product, msgs]); // Add product to the dependency array

  useEffect(() => {
    const url = "http://localhost:5000/get-products/" + params.productid;
    axios
      .get(url)
      .then((res) => {
        console.log(res, "0000");
        if (res.data.product) {
          setProduct(res.data.product);
          localStorage.setItem("ProductId", res.data.product._id);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("errorin product details");
      });
  }, []);

  const handelContect = (addBy) => {
    console.log("id", addBy);
    const url = "http://localhost:5000/get-user/" + addBy;
    axios
      .get(url)
      .then((res) => {
        console.log(res, "0000");
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("errorin product userr details");
      });
  };

  return (
    <>
      <Header />

      {product && (
        <div className="d-flex justify-content flex-wrap">
          <div className="image-container">
            <img
              className="image-one"
              src={"http://localhost:5000/" + product.pimage}
              alt=""
            />
            {product.pimage2 && (
              <img
                className="image-two"
                src={"http://localhost:5000/" + product.pimage2}
                alt=""
              />
            )}
          </div>

          <div className="details-cont">
            <h3>Product Details</h3>
            <div className="dt">
              <p className="p">
                {" "}
                <span>Name :</span> {product.pname}
              </p>
              <p className="p">
                <span>Category :</span> {product.pcategory}
              </p>
              <p className="price-p">
                <span>Price :</span> ₹ {product.price}
              </p>
              <p className="about-p">
                <span>About :</span> {product.pdesc}
              </p>
            </div>

            {product.addBy && (
              <button
                className="btn btn-primary bbtn"
                onClick={() => handelContect(product.addBy)}
              >
                SHOW CONTECT DETAILS
              </button>
            )}
            <div className="contctt2-div">
              {" "}
              {user && user.username && (
                <h4 className="contactt2">
                  <span>Owner Name :</span> {user.username}
                </h4>
              )}
              {user && user.email && (
                <h5 className="contactt2">
                  <span>Email :</span> {user.email}
                </h5>
              )}
              {user && user.mobile && (
                <h5 className="contactt2">
                  <span>Mobile :</span> {user.mobile}
                </h5>
              )}
            </div>
          </div>

          <div className="chat-box">
            <div className="ccc">CHAT</div>
            <div style={{
              paddingTop:"5rem",
              
            }}>
              {msgs &&
                msgs.length > 0 &&
                msgs.map((item, index) => {
                  if (item.username === localStorage.getItem("userName")) {
                    return (
                      <div
                        style={{
                          marginLeft: "250px",
                          backgroundColor: "yellow",
                          borderRadius: "20px",
                          width: "150px",
                        }}
                      >
                        <p key={item._id}>
                          {item.username}:{item.msg}
                        </p>
                      </div>
                    );
                  }
                  if (item.username !== localStorage.getItem("userName")) {
                    return (
                      <p
                        style={{
                          marginRight: "250px",
                          backgroundColor: "lightblue",
                          borderRadius: "50px",
                        }}
                      >
                        {item.username}:{item.msg}
                      </p>
                    );
                  }
                })}
            </div>
            <div className="chat-input2">
              <input
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
                className="form-control"
                type="text"
              />
              <button onClick={handelMsgsend} className="btn btn-primary">
                SEND
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
