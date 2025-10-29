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

// @route   GET /api/products/filter/categories
// @desc    Get all unique categories
router.get("/filter/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/products/filter/bestsellers
// @desc    Get bestseller products only
router.get("/filter/bestsellers", async (req, res) => {
  try {
    const products = await Product.find({ bestSeller: true }).sort({
      createdAt: -1,
    });
    res.json(products);
  } catch (err) {
    console.error("Error fetching bestsellers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/products/trending
// @desc    Fetch trending products
router.get("/trending", async (req, res) => {
  try {
    const trendingProducts = await Product.find({ trending: true }).sort({ createdAt: -1 });
    res.json(trendingProducts);
  } catch (err) {
    console.error("Error fetching trending products:", err);
    res.status(500).json({ message: "Server error while fetching trending products" });
  }
});

// @route   GET /api/products/search
// @desc    Search products
router.get('/search', async (req, res) => {
  const query = req.query.query || '';
  console.log("Search query:", query);

  if (!query) return res.json([]);

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).limit(10);

    console.log("Products found:", products.length);
    res.json(products);
  } catch (err) {
    console.error("Search route error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   GET /api/products
// @desc    Fetch all products with filters
router.get("/", async (req, res) => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      bestSeller,
      trending,
      festiveSpecial,
      newArrival,
      search,
      sort,
    } = req.query;

    // Build filter object
    let filter = {};

    // Category filter - handle both single and multiple categories
    if (category) {
      const categories = category.split(',').map(cat => cat.trim());
      filter.category = { $in: categories };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.salePrice = {};
      if (minPrice) filter.salePrice.$gte = Number(minPrice);
      if (maxPrice) filter.salePrice.$lte = Number(maxPrice);
    }

    // Boolean filters
    if (bestSeller === "true") filter.bestSeller = true;
    if (trending === "true") filter.trending = true;
    if (newArrival === "true") filter.newArrival = true;
    if (festiveSpecial) filter.festiveSpecial = festiveSpecial;

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Build sort object
    let sortOption = {};
    if (sort === "price-low-high") {
      sortOption.salePrice = 1;
    } else if (sort === "price-high-low") {
      sortOption.salePrice = -1;
    } else if (sort === "newest") {
      sortOption.createdAt = -1;
    } else {
      sortOption.createdAt = -1; // default
    }

    const products = await Product.find(filter).sort(sortOption);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "❌ Error fetching products" });
  }
});

// @route   GET /api/products/:id
// @desc    Fetch single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error while fetching product" });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
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

// @route   PUT /api/products/:id
// @desc    Update product
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

export default router;