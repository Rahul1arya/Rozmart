const mongoose = require("mongoose");
const Product = require("./models/Product");

// ✅ Replace this with your real MongoDB URI
const MONGODB_URI = "your_mongodb_connection_uri_here";

const sampleProducts = [
  {
    name: "Red T-Shirt",
    description: "Comfortable cotton red t-shirt",
    price: 499,
    image: "/images/red-shirt.jpg",
    stock: 10,
  },
  {
    name: "Blue Jeans",
    description: "Stylish blue denim jeans",
    price: 899,
    image: "/images/blue-jeans.jpg",
    stock: 8,
  },
  {
    name: "White Sneakers",
    description: "Trendy white sneakers for all outfits",
    price: 1299,
    image: "/images/white-sneakers.jpg",
    stock: 12,
  },
];

async function seedDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected ✅");

    await Product.deleteMany();
    console.log("Old products removed 🗑️");

    await Product.insertMany(sampleProducts);
    console.log("Sample products added ✅");

    process.exit();
  } catch (err) {
    console.error("Seed error ❌", err);
    process.exit(1);
  }
}

seedDB();