import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity = 1, selectedSize = null) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item._id === product._id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // New item
        return [
          ...prevItems,
          {
            _id: product._id,
            name: product.name,
            price: product.salePrice || product.regularPrice,
            image: product.images?.[0] || '/placeholder.png',
            quantity,
            selectedSize,
            stock: product.stock || 999,
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId, selectedSize = null) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item._id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  // Update item quantity
  const updateQuantity = (productId, quantity, selectedSize = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: Math.min(quantity, item.stock) }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartTax = cartSubtotal * 0.18; // 18% GST
  const cartShipping = cartSubtotal > 1000 ? 0 : 100; // Free shipping over ₹1000
  const cartTotal = cartSubtotal + cartTax + cartShipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartSubtotal,
        cartTax,
        cartShipping,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};