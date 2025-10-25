// src/pages/AllProducts.jsx
import React, { useEffect, useState } from "react";
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null); // track which menu is open
  const navigate = useNavigate();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">All Products</h1>
        <Link
          to="/add-product"
          className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Products Section */}
      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500 text-center mt-10 text-lg">
          No Products Found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-sm rounded-xl p-4 border border-gray-200 relative"
            >
              {/* Product Image */}
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={`http://localhost:5000${product.images[0]}`}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Product Info */}
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-base font-semibold text-gray-900">
                ₹{product.salePrice || product.regularPrice}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>

              {/* Stats */}
              <div className="mt-3 text-sm">
                <p className="flex justify-between text-gray-600">
                  <span>Stock</span>
                  <span>{product.stock}</span>
                </p>
              </div>

              {/* Options Button */}
              <div className="absolute top-3 right-3">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() =>
                    setMenuOpen(menuOpen === product._id ? null : product._id)
                  }
                >
                  <MoreVertical size={18} className="text-gray-500" />
                </button>

                {menuOpen === product._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md border border-gray-200 z-10">
                    <button
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100"
                      onClick={() => navigate(`/edit-product/${product._id}`)}
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(product._id)}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
