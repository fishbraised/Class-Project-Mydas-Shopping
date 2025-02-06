import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

import "./index.css";

const ProductCard = (props) => {
  const { productInfo } = props;
  const { title, imgUrl, brand, price, rating, id } = productInfo;

  return (
    <Link to={`/product-details/${id}`}>
      <li className="product-item">
        <img className="thumbnail" src={imgUrl} alt="product img" />
        <h2 className="title">{title}</h2>
        <p className="brand">{brand}</p>

        <div className="product-details">
          <p className="price">{price}</p>

          <div className="rating-container">
            <p className="rating">{rating}</p>
            <FaStar className="star"/>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default ProductCard;
