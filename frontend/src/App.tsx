import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LIstingPage from "./pages/LIstingPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./components/Cart"; // Import the new Cart component
import { AuthProvider } from './contexts/AuthContext';


export default function App() {
  return (

    <AuthProvider>
      <Router>
        <div className="overflow-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/listingPage" element={<LIstingPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} /> {/* Add the new Cart route */}
          </Routes>
        </div>
      </Router>

    </AuthProvider>

  );
}