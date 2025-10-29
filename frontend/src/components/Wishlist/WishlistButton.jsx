import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';

const WishlistButton = ({ product, className = "" }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleClick = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-full border transition-all duration-200 ${
        inWishlist
          ? 'bg-red-50 border-red-500 text-red-500'
          : 'bg-white border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
      } ${className}`}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={18}
        className={inWishlist ? 'fill-current' : ''}
      />
    </button>
  );
};

export default WishlistButton;