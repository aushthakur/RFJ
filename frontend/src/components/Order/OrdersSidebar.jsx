import React, { useState, useEffect } from 'react';
import { X, Package, Truck, CheckCircle, Clock, XCircle, ChevronRight, MessageCircle, Loader } from 'lucide-react';
import axios from 'axios';

const OrdersSidebar = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(
        'http://localhost:5000/api/orders/my-orders',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // If not logged in or error, show empty state
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getImageUrl = (image) => {
    if (!image) return '/placeholder.png';
    return image.startsWith('http') ? image : `http://localhost:5000${image}`;
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToList = () => {
    setSelectedOrder(null);
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
        className={`fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full font-['Poppins']">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              {selectedOrder && (
                <button
                  onClick={handleBackToList}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors mr-2"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 rotate-180" />
                </button>
              )}
              <Package className="h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-bold text-gray-900">
                {selectedOrder ? 'Order Details' : 'My Orders'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <Loader className="h-12 w-12 text-amber-600 animate-spin mb-4" />
                <p className="text-gray-500">Loading orders...</p>
              </div>
            ) : selectedOrder ? (
              // Order Details View
              <div className="p-6 space-y-6">
                {/* Order Status */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Order ID</span>
                    <span className="text-sm font-semibold text-gray-900">
                      #{selectedOrder._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Order Date</span>
                    <span className="text-sm text-gray-900">
                      {formatDate(selectedOrder.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
                        selectedOrder.orderStatus
                      )}`}
                    >
                      {selectedOrder.orderStatus.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {item.name}
                          </h4>
                          {item.size && (
                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                          )}
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Shipping Address
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-700">
                    <p className="font-medium">
                      {selectedOrder.shippingAddress.firstName}{' '}
                      {selectedOrder.shippingAddress.lastName}
                    </p>
                    <p className="mt-1">{selectedOrder.shippingAddress.address}</p>
                    {selectedOrder.shippingAddress.apartment && (
                      <p>{selectedOrder.shippingAddress.apartment}</p>
                    )}
                    <p>
                      {selectedOrder.shippingAddress.city},{' '}
                      {selectedOrder.shippingAddress.state} -{' '}
                      {selectedOrder.shippingAddress.pincode}
                    </p>
                    <p className="mt-2">
                      Phone: {selectedOrder.shippingAddress.phone}
                    </p>
                    <p>Email: {selectedOrder.shippingAddress.email}</p>
                  </div>
                </div>

                {/* Payment Info */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Payment Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.paymentMethod === 'cod'
                          ? 'Cash on Delivery'
                          : 'Card Payment'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment Status</span>
                      <span
                        className={`font-medium ${
                          selectedOrder.paymentStatus === 'paid'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                      >
                        {selectedOrder.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-gray-900">Total Amount</span>
                        <span className="text-gray-900">
                          ₹{selectedOrder.totalAmount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking */}
                {selectedOrder.trackingNumber && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Tracking</h3>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <p className="text-sm text-gray-700">
                        Tracking Number:{' '}
                        <span className="font-semibold">
                          {selectedOrder.trackingNumber}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Support */}
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Support</span>
                </button>
              </div>
            ) : orders.length === 0 ? (
              // Empty State
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <Package className="h-20 w-20 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg font-medium">No orders yet</p>
                <p className="text-gray-400 text-sm mt-2">
                  Your order history will appear here
                </p>
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = '/';
                  }}
                  className="mt-6 bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              // Orders List
              <div className="p-6 space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    onClick={() => handleOrderClick(order)}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.orderStatus)}
                        <span className="font-semibold text-gray-900">
                          Order #{order._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {formatDate(order.createdAt)}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">
                        {order.items.length} item(s)
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{order.totalAmount.toLocaleString()}
                      </span>
                    </div>

                    {/* First 2 items preview */}
                    <div className="flex space-x-2">
                      {order.items.slice(0, 2).map((item, index) => (
                        <img
                          key={index}
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded border border-gray-200"
                        />
                      ))}
                      {order.items.length > 2 && (
                        <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium">
                          +{order.items.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersSidebar;