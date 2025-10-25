import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import Product from "../models/Product.js";

const router = express.Router();

// File storage setup with multer
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/")); // upload folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_")
    );
  },
});

const upload = multer({ storage });

// @route   POST /api/products
// @desc    Add new product
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      sku,
      stock,
      regularPrice,
      salePrice,
      tags,
      bestSeller,
      trending,
      festiveSpecial,
      newArrival,
    } = req.body;

    const images = req.files.map((file) => `/uploads/${file.filename}`);

    const product = new Product({
      name,
      description,
      category,
      brand,
      sku,
      stock,
      regularPrice,
      salePrice,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      bestSeller: bestSeller === "true",
      trending: trending === "true",
      festiveSpecial,
      newArrival: newArrival === "true",
      images,
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Server error", error: err.message });
  }
});

// @route   GET /api/products
// @desc    Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching products" });
  }
});

// DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE product
router.put("/:id", upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Convert checkboxes to booleans
    if (updateData.bestSeller) updateData.bestSeller = updateData.bestSeller === "true";
    if (updateData.trending) updateData.trending = updateData.trending === "true";
    if (updateData.newArrival) updateData.newArrival = updateData.newArrival === "true";

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "✅ Product updated successfully", product });
  } catch (err) {
    res.status(500).json({ message: "❌ Error updating product" });
  }
});

// @route   GET /api/products/trending
router.get("/trending", async (req, res) => {
  try {
    const trendingProducts = await Product.find({ trending: true }).sort({ createdAt: -1 });
    res.json(trendingProducts);
  } catch (err) {
    console.error("Error fetching trending products:", err);
    res.status(500).json({ message: "Server error while fetching trending products" });
  }
});

export default router;
