import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  alt: { type: String },
});

export default mongoose.model("carouselModel", carouselSchema);
