import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    category: String,
    brand: String,
    sku: String,
    stock: { type: Number, default: 0 },
    regularPrice: Number,
    salePrice: Number,
    tags: [String],
    bestSeller: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    festiveSpecial: String,
    newArrival: { type: Boolean, default: false },
    images: [String], // will store file paths
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
