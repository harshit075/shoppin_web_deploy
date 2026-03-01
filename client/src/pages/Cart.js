import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cart, updateCartItem, removeFromCart, checkout }) {
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    const result = await checkout();
    setIsProcessing(false);
    if (result) {
      setOrderPlaced(result);
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase</p>
        <div className="order-details">
          <p><strong>Order ID:</strong> #{orderPlaced.orderId}</p>
          <p><strong>Total:</strong> ${orderPlaced.total}</p>
        </div>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to get started!</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.productId} className="cart-item">
              <img 
                src={item.product?.image} 
                alt={item.product?.name} 
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <Link to={`/product/${item.productId}`}>
                  <h3>{item.product?.name}</h3>
                </Link>
                <p className="cart-item-price">${item.product?.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-quantity">
                <button 
                  className="quantity-btn"
                  onClick={() => updateCartItem(item.productId, item.quantity - 1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => updateCartItem(item.productId, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                ${(item.product?.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="btn btn-danger remove-btn"
                onClick={() => removeFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            className="btn btn-success checkout-btn" 
            onClick={handleCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
          </button>
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
