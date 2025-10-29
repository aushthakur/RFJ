import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create order (COD)
router.post("/create", createOrder);

// Get user orders (protected)
router.get("/my-orders", protect, getUserOrders);

// Get single order
router.get("/:id", getOrderById);

// Update order status (admin only)
router.put("/:id/status", protect, admin, updateOrderStatus);

// Cancel order (user)
router.put("/:id/cancel", protect, cancelOrder);

export default router;
