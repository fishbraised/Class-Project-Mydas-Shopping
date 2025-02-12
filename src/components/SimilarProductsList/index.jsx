import SimilarProductItem from "../SimilarProductItem";

import "./index.css"

const SimilarProductsList = (props) => {
    const { similarProductsInfo } = props;

    return (
        <ul className="similar-products-list">
            {similarProductsInfo.map((eachObj) => <SimilarProductItem key={eachObj.id} similarProductInfo={eachObj} />)}
        </ul>
    );
}

export default SimilarProductsList;