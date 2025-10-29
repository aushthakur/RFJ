import express from "express";
import {
  createCheckoutSession,
  stripeWebhook,
  verifySession,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create checkout session
router.post("/create-checkout-session", createCheckoutSession);

// Stripe webhook (raw body required)
router.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// Verify payment session
router.get("/verify-session/:sessionId", verifySession);

export default router;
