import express from "express";
import multer from "multer";
import Carousel from "../models/carouselModel.js";

const router = express.Router();

// Multer setup for local uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// @route   GET /api/carousel
// @desc    Get all carousel images
router.get("/", async (req, res) => {
  try {
    const images = await Carousel.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /api/carousel
// @desc    Add image (file or URL)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.imageUrl;

    if (!imageUrl) {
      return res.status(400).json({ error: "No image provided" });
    }

    const newImage = new Carousel({
      imageUrl,
      alt: req.body.alt || "Hero Carousel Image",
    });

    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   DELETE /api/carousel/:id
// @desc    Delete image
router.delete("/:id", async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
