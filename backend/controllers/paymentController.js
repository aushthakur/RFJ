import Stripe from "stripe";
import * as Order from "../models/Order.js"; // ✅ works with module.exports
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems, shippingDetails } = req.body;

    // Calculate totals
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 1000 ? 0 : 100;
    const total = subtotal + tax + shipping;

    // Create Stripe line items
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [
            item.image.startsWith("http")
              ? item.image
              : `${process.env.BASE_URL}${item.image}`,
          ],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add GST and Shipping line items
    if (tax > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: "GST (18%)" },
          unit_amount: Math.round(tax * 100),
        },
        quantity: 1,
      });
    }

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: { name: "Shipping" },
          unit_amount: Math.round(shipping * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      customer_email: shippingDetails.email,
      metadata: {
        cartItems: JSON.stringify(cartItems),
        shippingDetails: JSON.stringify(shippingDetails),
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

// Webhook to handle successful payment
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const cartItems = JSON.parse(session.metadata.cartItems);
      const shippingDetails = JSON.parse(session.metadata.shippingDetails);

      const order = new Order({
        user: req.user?._id,
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          image: item.image,
        })),
        shippingAddress: {
          firstName: shippingDetails.firstName,
          lastName: shippingDetails.lastName,
          email: shippingDetails.email,
          phone: shippingDetails.phone,
          address: shippingDetails.address,
          apartment: shippingDetails.apartment,
          city: shippingDetails.city,
          state: shippingDetails.state,
          pincode: shippingDetails.pincode,
          country: shippingDetails.country,
        },
        paymentMethod: "card",
        paymentStatus: "paid",
        paymentId: session.payment_intent,
        totalAmount: session.amount_total / 100,
        orderStatus: "processing",
      });

      await order.save();
      // Optionally: send confirmation email
      // await sendOrderConfirmationEmail(order);
    } catch (error) {
      console.error("Order creation error:", error);
    }
  }

  res.json({ received: true });
};

// Verify payment session
export const verifySession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.status(200).json({
      paymentStatus: session.payment_status,
      customerEmail: session.customer_email,
    });
  } catch (error) {
    console.error("Session verification error:", error);
    res.status(500).json({ message: "Failed to verify payment session" });
  }
};
