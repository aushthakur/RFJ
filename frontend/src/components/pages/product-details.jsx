import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, Minus, Plus, Star, ZoomIn, ShoppingCart, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    review: "",
  });
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // Check if product is in wishlist
  const isWishlisted = product ? isInWishlist(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      axios
        .get(`http://localhost:5000/api/products?category=${product.category}`)
        .then((res) => {
          const filtered = res.data.filter((p) => p._id !== product._id);
          setSimilarProducts(filtered);
        })
        .catch((err) => console.error("Error fetching similar products:", err));
    }
  }, [product]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
      
      // Show success toast
      setShowAddedToast(true);
      setTimeout(() => setShowAddedToast(false), 3000);
      
      // Reset quantity after adding
      setQuantity(1);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      // Add to cart first
      addToCart(product, quantity, selectedSize);
      
      // Redirect to checkout page
      navigate('/checkout');
    }
  };

  const handleReviewSubmit = () => {
    if (reviewForm.name && reviewForm.email && reviewForm.review && rating > 0) {
      console.log("Review submitted:", { ...reviewForm, rating });
      // TODO: Send review to backend
      // axios.post(`http://localhost:5000/api/products/${id}/reviews`, {
      //   ...reviewForm,
      //   rating
      // });
      
      setReviewForm({ name: "", email: "", review: "" });
      setRating(0);
      
      // Show success message
      alert("Thank you for your review!");
    } else {
      alert("Please fill in all fields and provide a rating");
    }
  };

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  const getImageUrl = (image) => {
    if (!image) return "/placeholder.png";
    return image.startsWith("http") ? image : `http://localhost:5000${image}`;
  };

  const reviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      date: '2 days ago',
      text: 'Absolutely beautiful jewellery! The craftsmanship is excellent and the gold plating looks very premium. I wore it to a wedding and received so many compliments. Highly recommended!',
    },
    {
      id: 2,
      name: 'Rahul Verma',
      rating: 5,
      date: '5 days ago',
      text: 'Bought this as a gift for my wife and she absolutely loved it! The quality is outstanding and the design is elegant. The packaging was also very nice. Great purchase!',
    },
    {
      id: 3,
      name: 'Anjali Patel',
      rating: 4,
      date: '1 week ago',
      text: 'Very happy with my purchase. The jewellery looks exactly like the pictures and the finish is smooth. The stones are well set and sparkle beautifully. Worth every penny!',
    }
  ];

  return (
    <div className="min-h-screen mt-10 bg-white pt-20 font-['Poppins']">
      {/* Success Toast */}
      {showAddedToast && (
        <div className="fixed top-24 right-4 z-50 animate-slide-in-right">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3">
            <CheckCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm">Item successfully added to your cart</p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <nav className="text-sm text-gray-500">
            <span
              className="hover:text-gray-700 cursor-pointer transition-colors"
              onClick={() => navigate("/")}
            >
              Product Listing
            </span>
            <span className="mx-2">›</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Thumbnails First - Left Side */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-3 w-24">
                {product.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                      selectedImage === index
                        ? "border-gray-800 border-2"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative bg-gray-50 rounded-lg overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={getImageUrl(product.images?.[selectedImage])}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
                  />
                  <div className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                    <ZoomIn size={20} className="text-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="lg:pl-8">
            {/* Wishlist Icon - Top Right */}
            <div className="flex justify-end mb-4">
              <button
                onClick={handleWishlistToggle}
                className="p-2 hover:bg-gray-100 rounded-full transition-all transform hover:scale-110"
              >
                <Heart
                  size={24}
                  className={
                    isWishlisted
                      ? "text-red-500 fill-current"
                      : "text-gray-400"
                  }
                />
              </button>
            </div>

            <h1 className="text-3xl font-normal text-gray-900 mb-4 leading-snug">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-normal text-gray-900">
                ₹{product.salePrice ? Number(product.salePrice).toLocaleString() : "N/A"}
              </span>
              {product.regularPrice && product.regularPrice !== product.salePrice && (
                <span className="text-2xl text-gray-400 line-through">
                  ₹{Number(product.regularPrice).toLocaleString()}
                </span>
              )}
              {/* Rating */}
              <div className="flex items-center gap-1 ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating || 4)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  ({product.reviews?.length || 32} review)
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <span className="text-green-600 text-sm font-medium">
                  ✓ In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-red-600 text-sm font-medium">
                  ✗ Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-base">
              {product.description}
            </p>

            {/* Features - Bullet Points */}
            {product.features && product.features.length > 0 && (
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 text-base">
                    <span className="text-gray-900 mt-1.5 text-xs">●</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Size Selection (if product has sizes) */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Size
                </label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded transition-all ${
                        selectedSize === size
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Info */}
            <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free worldwide shipping on all orders over ₹1000
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Delivers in: 3-7 Working Days Shipping & Return
              </p>
            </div>

            {/* Quantity and Buttons */}
            <div className="space-y-3">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange("decrement")}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center border-x border-gray-300 text-gray-900 font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increment")}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={product.stock && quantity >= product.stock}
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-gray-900 text-white h-10 px-8 rounded hover:bg-gray-800 transition-all font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>

              {/* Buy Now Button */}
              <button 
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="w-full bg-amber-600 text-white h-10 px-8 rounded hover:bg-amber-700 transition-all font-medium text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 duration-200"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          {/* Tab Headers */}
          <div className="flex gap-12 border-b border-gray-300 mb-8">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-3 font-medium text-base transition-colors relative ${
                activeTab === "description" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Description
              {activeTab === "description" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 font-medium text-base transition-colors relative ${
                activeTab === "reviews" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Reviews
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "description" && (
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed text-base">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600 text-base">
                      <span className="text-gray-900 mt-1.5 text-xs">●</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-8">
              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-medium text-sm">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{review.text}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-gray-500 hover:text-gray-900 transition-colors">Like</button>
                          <button className="text-gray-500 hover:text-gray-900 transition-colors">Reply</button>
                          <span className="text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name*"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                    />
                    <input
                      type="email"
                      placeholder="Your Email*"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      className="px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-sm"
                    />
                  </div>
                  <textarea
                    placeholder="Write your review*"
                    value={reviewForm.review}
                    onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded focus:outline-none focus:border-gray-400 resize-none text-sm"
                  ></textarea>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-2 font-medium">Your Ratings*</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        >
                          <Star
                            size={24}
                            className={`transition-colors ${
                              star <= (hoverRating || rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleReviewSubmit}
                    className="bg-gray-900 text-white px-8 py-2.5 rounded hover:bg-gray-800 transition-colors font-medium text-sm"
                  >
                    Post Review
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-normal text-gray-900 mb-8 text-center">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="bg-white rounded-lg overflow-hidden border border-gray-200 group cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={getImageUrl(p.images?.[0])}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-normal mb-2 text-base">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">
                        Starting ₹{(p.salePrice || p.regularPrice)?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;