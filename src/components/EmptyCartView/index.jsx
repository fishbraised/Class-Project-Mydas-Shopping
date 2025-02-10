import { Link } from 'react-router-dom';

import './index.css';

const EmptyCartView = () => (
  <div className="cart-empty-view-container">
    <img
      src="https://img.freepik.com/premium-vector/man-with-empty-shopping-cart-special-offer-sale-discount-store-consumer-person-flat-illustration_272892-88.jpg"
      className="cart-empty-image"
      alt="cart empty"
    />
    <h1 className="cart-empty-heading">Your Cart Is Empty</h1>
    
    <Link to="/products">
      <button type="button" className="shop-now-btn">
        Shop Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;