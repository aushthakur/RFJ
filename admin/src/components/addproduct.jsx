import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    stock: "",
    regularPrice: "",
    salePrice: "",
    tags: "",
    bestSeller: false,
    trending: false,
    festiveSpecial: "",
    newArrival: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...e.target.files] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => payload.append("images", file));
      } else {
        payload.append(key, formData[key]);
      }
    });

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: payload,
      });
      if (res.ok) {
        alert("Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          brand: "",
          sku: "",
          stock: "",
          regularPrice: "",
          salePrice: "",
          tags: "",
          bestSeller: false,
          trending: false,
          festiveSpecial: "",
          newArrival: false,
          images: [],
        });
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2 h-24"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="brand"
              placeholder="Brand Name"
              value={formData.brand}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={formData.sku}
                onChange={handleChange}
                className="w-1/2 border rounded-md p-2"
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={handleChange}
                className="w-1/2 border rounded-md p-2"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                name="regularPrice"
                placeholder="Regular Price"
                value={formData.regularPrice}
                onChange={handleChange}
                className="w-1/2 border rounded-md p-2"
              />
              <input
                type="number"
                name="salePrice"
                placeholder="Sale Price"
                value={formData.salePrice}
                onChange={handleChange}
                className="w-1/2 border rounded-md p-2"
              />
            </div>
            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />

            {/* Extra Fields */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bestSeller"
                  checked={formData.bestSeller}
                  onChange={handleChange}
                />
                Best Seller
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="trending"
                  checked={formData.trending}
                  onChange={handleChange}
                />
                Trending
              </label>
              <label>
                Festive Special:
                <select
                  name="festiveSpecial"
                  value={formData.festiveSpecial}
                  onChange={handleChange}
                  className="w-full border rounded-md p-2 mt-1"
                >
                  <option value="">-- Select --</option>
                  <option value="wedding">Wedding</option>
                  <option value="diwali">Diwali</option>
                  <option value="ethnic">Ethnic</option>
                </select>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="newArrival"
                  checked={formData.newArrival}
                  onChange={handleChange}
                />
                New Arrival
              </label>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <div className="border border-dashed border-gray-400 rounded-md p-4 text-center">
              <p className="mb-2">Upload Product Images</p>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-600"
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow hover:bg-yellow-600"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-300 px-4 py-2 rounded-md shadow hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
