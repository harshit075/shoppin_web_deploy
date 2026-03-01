import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">&larr; Back to Products</Link>
      
      {added && (
        <div className="toast-notification">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Added {quantity} item(s) to cart!
        </div>
      )}
      
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">{product.price.toFixed(2)}</p>
          <p className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </p>
          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>
          <button 
            className="btn btn-success add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
