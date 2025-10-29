import React from 'react';
import { X, Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

const WishlistSidebar = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    return image.startsWith("http") ? image : `http://localhost:5000${image}`;
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-none bg-opacity-40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            <h2 className="text-xl font-semibold text-gray-800">
              My Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Save your favorite items here to purchase later
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="p-6">
              {/* Clear All Button */}
              {wishlist.length > 0 && (
                <button
                  onClick={clearWishlist}
                  className="w-full mb-4 px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  Clear All
                </button>
              )}

              {/* Wishlist Items */}
              <div className="space-y-4">
                {wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    {/* Product Image */}
                    <div
                      className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => handleProductClick(item._id)}
                    >
                      <img
                        src={getImageUrl(item.images?.[0])}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-sm font-medium text-gray-800 mb-1 cursor-pointer hover:text-amber-600 transition-colors line-clamp-2"
                        onClick={() => handleProductClick(item._id)}
                      >
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        {item.regularPrice && item.salePrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{item.regularPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-base font-semibold text-gray-900">
                          ₹{(item.salePrice || item.regularPrice)?.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleProductClick(item._id)}
                          className="flex-1 px-3 py-1.5 text-xs bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-1"
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFromWishlist(item._id);
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default WishlistSidebar;
