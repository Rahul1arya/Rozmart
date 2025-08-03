const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

// Create Order
router.post("/", verifyToken, async (req, res) => {
  try {
    const newOrder = new Order({
      user: req.user.id,
      products: req.body.products,
      amount: req.body.amount,
      address: req.body.address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get my Orders
router.get("/my", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all Orders (Admin)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.productId");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update order status (Admin)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;