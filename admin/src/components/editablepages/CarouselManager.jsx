import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function CarouselManager() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch all carousel images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/carousel");
      setImages(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch images:", error);
    } finally {
      setLoading(false);
    }
  };

  // Upload new image (file or external URL)
  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file && !url) {
      alert("Please select a file or provide an image URL");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      if (file) formData.append("image", file);
      if (url) formData.append("imageUrl", url);
      formData.append("alt", alt || "Hero Carousel Image");

      await axios.post("http://localhost:5000/api/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setFile(null);
      setUrl("");
      setAlt("");

      // Refresh images
      fetchImages();
    } catch (error) {
      console.error("❌ Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Delete image by ID
  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/carousel/${id}`);
      fetchImages();
    } catch (error) {
      console.error("❌ Failed to delete image:", error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl mb-6 font-bold text-gray-800">✨ Manage Hero Carousel</h2>

      {/* Upload Form */}
      <motion.form
        onSubmit={uploadImage}
        className="space-y-4 bg-white p-6 rounded-xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <label className="block">
          <span className="text-gray-600 text-sm">Upload File</span>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block mt-1 text-sm"
          />
        </label>

        <input
          type="text"
          placeholder="Or enter image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Alt text (optional)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="border p-2 w-full rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-md transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : " Add Image"}
        </button>
      </motion.form>

      {/* Image List */}
      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500">Loading images...</p>
        ) : images.length === 0 ? (
          <p className="text-gray-500">No carousel images yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <AnimatePresence>
              {images.map((img) => (
                <motion.div
                  key={img._id}
                  className="relative group rounded-xl overflow-hidden shadow-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={
                      img.imageUrl.startsWith("http")
                        ? img.imageUrl
                        : `http://localhost:5000${img.imageUrl}`
                    }
                    alt={img.alt}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <motion.button
                    onClick={() => deleteImage(img._id)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm shadow-lg opacity-0 group-hover:opacity-100 transition"
                    whileTap={{ scale: 0.9 }}
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarouselManager;
