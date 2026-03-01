const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample products data
let products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    image: "https://via.placeholder.com/300x300?text=Headphones",
    category: "Electronics",
    stock: 50
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 199.99,
    image: "https://via.placeholder.com/300x300?text=SmartWatch",
    category: "Electronics",
    stock: 30
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Comfortable running shoes for athletes",
    price: 79.99,
    image: "https://via.placeholder.com/300x300?text=Shoes",
    category: "Sports",
    stock: 100
  },
  {
    id: 4,
    name: "Laptop Backpack",
    description: "Durable backpack with laptop compartment",
    price: 49.99,
    image: "https://via.placeholder.com/300x300?text=Backpack",
    category: "Accessories",
    stock: 75
  },
  {
    id: 5,
    name: "Coffee Maker",
    description: "Automatic coffee maker with programmable settings",
    price: 129.99,
    image: "https://via.placeholder.com/300x300?text=CoffeeMaker",
    category: "Home",
    stock: 25
  },
  {
    id: 6,
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 29.99,
    image: "https://via.placeholder.com/300x300?text=YogaMat",
    category: "Sports",
    stock: 200
  }
];

// In-memory cart (for demo purposes)
let cart = [];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get cart
app.get('/api/cart', (req, res) => {
  const cartWithDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  });
  res.json(cartWithDetails);
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.json({ message: 'Added to cart', cart });
});

// Update cart item
app.put('/api/cart/:productId', (req, res) => {
  const { quantity } = req.body;
  const productId = parseInt(req.params.productId);
  
  const item = cart.find(item => item.productId === productId);
  
  if (!item) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  if (quantity <= 0) {
    cart = cart.filter(item => item.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  res.json({ message: 'Cart updated', cart });
});

// Remove from cart
app.delete('/api/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(item => item.productId !== productId);
  res.json({ message: 'Removed from cart', cart });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Checkout (mock)
app.post('/api/checkout', (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  
  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    return sum + (product.price * item.quantity);
  }, 0);

  // Clear cart after checkout
  cart = [];
  
  res.json({ 
    message: 'Order placed successfully',
    orderId: Date.now(),
    total: total.toFixed(2)
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
