import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    cartSubtotal,
    cartTax,
    cartShipping,
    cartTotal,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-12 font-['Poppins']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors inline-flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center space-x-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedSize}`}
                    className="flex space-x-4 p-4 border border-gray-200 rounded-lg hover:border-amber-300 transition-colors"
                  >
                    {/* Product Image */}
                    <img
                      src={
                        item.image.startsWith('http')
                          ? item.image
                          : `http://localhost:5000${item.image}`
                      }
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.selectedSize && (
                            <p className="text-sm text-gray-500 mt-1">
                              Size: {item.selectedSize}
                            </p>
                          )}
                          <p className="text-amber-600 font-bold mt-2">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            removeFromCart(item._id, item.selectedSize)
                          }
                          className="p-2 h-10 hover:bg-red-50 rounded-lg transition-colors group"
                        >
                          <Trash2 className="h-5 w-5 text-gray-400 group-hover:text-red-500" />
                        </button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg border border-gray-300 p-1">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1,
                                item.selectedSize
                              )
                            }
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <Minus className="h-4 w-4 text-gray-600" />
                          </button>
                          <span className="px-4 font-medium text-gray-900">
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
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <Plus className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>

                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">
                    ₹{cartSubtotal.toLocaleString()}
                  </span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST 18%)</span>
                  <span className="font-medium">
                    ₹{cartTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {cartShipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₹${cartShipping}`
                    )}
                  </span>
                </div>

                {cartShipping > 0 && (
                  <p className="text-xs text-gray-500 bg-amber-50 p-2 rounded">
                    Add ₹{(1000 - cartSubtotal).toLocaleString()} more for FREE
                    shipping!
                  </p>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{cartTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-105 duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/')}
                className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;