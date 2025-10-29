import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, Package, Home } from 'lucide-react';

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    // Confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-32 pb-12 font-['Poppins']">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center transform animate-scale-in">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce-in">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Details */}
          <div className="bg-amber-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Package className="h-6 w-6 text-amber-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Order Details
              </h2>
            </div>
            
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Order ID:</span>{' '}
                <span className="text-amber-600 font-semibold">
                  #{orderId || 'XXXXXXXX'}
                </span>
              </p>
              <p className="text-sm">
                A confirmation email has been sent to your registered email address.
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>You will receive an order confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Track your order status in your account dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>Your order will be delivered within 5-7 business days</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/orders')}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-105 duration-200"
            >
              Track Order
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <Home className="h-5 w-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          {/* Support */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Need help?{' '}
              <a
                href="/contact"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;