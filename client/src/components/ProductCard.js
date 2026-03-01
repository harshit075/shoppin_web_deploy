import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-price">{product.price.toFixed(2)}</p>
        <button 
          className="btn btn-primary add-to-cart-btn"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
