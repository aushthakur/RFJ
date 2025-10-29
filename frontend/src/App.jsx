import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Basics/navbar";
import Footer from "./components/Basics/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/landingpage";
import Bestseller from "./components/pages/bestseller";
import EarringsPage from './components/pages/earrings';
import NecklacesPage from './components/pages/necklaces';
import Festival from './components/pages/festival';
import Customized from './components/pages/customize';
import Gifting from "./components/pages/gifting";
import ProductDetailPage from "./components/pages/product-details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext'; // ← ADD THIS
import CartPage from './components/cart/CartPage'; // ← ADD THIS
import CheckoutPage from './components/Checkout/CheckoutPage'; // ← ADD THIS
import OrderSuccessPage from './components/Order/OrderSuccessPage'; // ← ADD THIS


const App = () => {
  return (
                <WishlistProvider>
                  <CartProvider> {/* ← WRAP WITH CartProvider */}


    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
      <ToastContainer position="top-center" autoClose={2000} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
  <Route path="/bestseller" element={<Bestseller />} />
         <Route path="/earrings" element={<EarringsPage />} />
     
         <Route path="/necklaces" element={<NecklacesPage/>} />
         <Route path="/festival" element={<Festival/>} />
         <Route path="/customize" element={<Customized/>} />
            <Route path="/gifting" element={<Gifting/>} />
        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* ✅ This is required */}
        <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />


          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
    </CartProvider>
          </WishlistProvider>

        

  );
};

export default App;
