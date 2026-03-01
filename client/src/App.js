import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`${API_URL}/cart`);
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await fetch(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity })
      });
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await fetch(`${API_URL}/cart/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch(`${API_URL}/cart/${productId}`, {
        method: 'DELETE'
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const checkout = async () => {
    try {
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        fetchCart();
        return data;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navbar cartItemCount={cartItemCount} />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  products={products} 
                  loading={loading} 
                  addToCart={addToCart} 
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  products={products} 
                  addToCart={addToCart} 
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  updateCartItem={updateCartItem}
                  removeFromCart={removeFromCart}
                  checkout={checkout}
                />
              } 
            />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2026 ShopEasy. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
