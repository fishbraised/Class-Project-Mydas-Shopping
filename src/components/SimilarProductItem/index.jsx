import { FaStar } from "react-icons/fa";

import "./index.css";

const SimilarProductItem = (props) => {
    const { similarProductInfo } = props;

    return (
        <li>
            <img className="similar-products-image" src={similarProductInfo.imageUrl} alt="similar-products-image"  />
            <p className="similar-products-title">{similarProductInfo.title}</p>
            <p className="similar-products-brand">by {similarProductInfo.brand}</p>

            <div className="similar-products-price-and-rating">
                <p className="similar-products-price">{similarProductInfo.price}</p>
                
                <div className="similar-products-rating">
                    {similarProductInfo.rating}
                    <span>
                        <FaStar />
                    </span>
                </div>
            </div>
        </li>
    )
}

export default SimilarProductItem;