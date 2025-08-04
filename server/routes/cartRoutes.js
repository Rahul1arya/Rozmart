const router = require("express").Router();
const Cart = require("../models/Cart");
const { verifyToken } = require("../middleware/authMiddleware");

// Get my Cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("products.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add/Update Cart
router.post("/", verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // If cart exists, update
      cart.products = req.body.products;
    } else {
      // Else, create new
      cart = new Cart({
        user: req.user.id,
        products: req.body.products,
      });
    }

    const saved = await cart.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Clear Cart
router.delete("/", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;