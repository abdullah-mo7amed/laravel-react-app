import "./bootstrap";
import "../css/app.css";

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import Checkout from "./Pages/Checkout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import axios from "axios";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios
      .get("/api/user")
      .then((res) => {
        if (res.data) setIsLogin(true);
        else setIsLogin(false);
      })
      .catch(() => setIsLogin(false));
  }, []);

  useEffect(() => {
    if (!isLogin) {
      setCartItems([]);
      return;
    }
    axios
      .get("/api/cart")
      .then((res) => setCartItems(res.data.data || []))
      .catch(() => setCartItems([]));
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route
          path="/"
          element={
            <Products
              cartItems={cartItems}
              setCartItems={setCartItems}
              isLogin={isLogin}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout cartItems={cartItems} isLogin={isLogin} setCartItems={setCartItems} />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
