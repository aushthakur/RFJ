import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full font-['Poppins']">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">
                Shopping Cart ({cartCount})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-20 w-20 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
                <p className="text-gray-400 text-sm mt-2">
                  Add items to get started
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item._id}-${item.selectedSize}`}
                  className="flex space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Product Image */}
                  <img
                    src={
                      item.image.startsWith('http')
                        ? item.image
                        : `http://localhost:5000${item.image}`
                    }
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {item.name}
                      </h3>
                      {item.selectedSize && (
                        <p className="text-xs text-gray-500 mt-1">
                          Size: {item.selectedSize}
                        </p>
                      )}
                      <p className="text-amber-600 font-bold mt-1">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 bg-white rounded-lg border border-gray-300">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity - 1,
                              item.selectedSize
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-l-lg transition-colors"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity + 1,
                              item.selectedSize
                            )
                          }
                          className="p-1 hover:bg-gray-100 rounded-r-lg transition-colors"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id, item.selectedSize)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                      >
                        <Trash2 className="h-4 w-4 text-gray-400 group-hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-700">Subtotal:</span>
                <span className="font-bold text-gray-900">
                  ₹{cartSubtotal.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Taxes and shipping calculated at checkout
              </p>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-105 duration-200"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;