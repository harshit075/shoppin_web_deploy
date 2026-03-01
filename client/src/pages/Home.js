import React from 'react';
import ProductCard from '../components/ProductCard';
import './Home.css';

function Home({ products, loading, addToCart }) {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to ShopEasy</h1>
        <p>Discover amazing products at unbeatable prices. Shop the latest trends today!</p>
      </div>
      <h2 className="section-title">Featured Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
