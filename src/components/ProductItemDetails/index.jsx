import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import NavBar from "../NavBar";
import SimilarProductsList from "../SimilarProductsList"
import { FaStar } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

import "./index.css";
import { Component } from "react";


const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
  };

class ProductItemDetails extends Component {
    state = { productDetails: [], apiStatus: apiStatusConstants.initial };

    getProductDetailsSuccess = (data) => {
        const updatedData = {
            availability: data.availability,
            brand: data.brand,
            description: data.description,
            id: data.id,
            imageUrl: data.image_url,
            price: data.price,
            rating: data.rating,
            similarProducts: data.similar_products.map((eachObj) => ({
                availability: eachObj.availability,
                brand: eachObj.brand,
                description: eachObj.description,
                id: eachObj.id,
                imageUrl: eachObj.image_url,
                price: eachObj.price,
                rating: eachObj.rating,
                style: eachObj.style,
                title: eachObj.title,
                totalReviews: eachObj.total_reviews,
            })),
            style: data.style,
            title: data.title,
            totalReviews: data.total_reviews,
        }

        this.setState({ productDetails: updatedData, apiStatus: apiStatusConstants.success})
    }

    getProductDetailsFailure = () => {
        this.setState({ apiStatus: apiStatusConstants.failure })
    }

    getProductDetailsData = async () => {
        this.setState({ apiStatus: apiStatusConstants.inProgress });

        const { match } = this.props;
        const { params } = match;
        const { id } = params;

        const URL = `https://apis.ccbp.in/products/${id}`;
        const jwtToken = Cookies.get("jwt_token");

        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            }
        }

        const response = await fetch(URL, options);
        const data = await response.json();

        if (response.ok) {
            this.getProductDetailsSuccess(data);
        } else {
            this.getProductDetailsFailure(data.error_msg);
        }
    }

    renderSuccessView = () => {
        const { productDetails } = this.state;

        return (
            <div className="product-item-details">
                <div className="product-item-content">
                    <section>
                        <img className="product-item-image" src={productDetails.imageUrl} alt="product-item-image" />
                        
                        <div className="product-info">
                            <h2 className="product-item-name">{productDetails.title}</h2>
                            <h2 className="product-item-price">{productDetails.price}</h2>
                            
                            <div className="product-item-rating-and-reviews">
                                <div className="product-item-rating">
                                    {productDetails.rating}
                                    <span>
                                        <FaStar />
                                    </span>
                                </div>

                                <p className="product-item-reviews">{productDetails.totalReviews}</p>
                            </div>
                            
                            <p className="product-item-description">{productDetails.description}</p>
                            <p className="product-item-info"><span>Availablility:</span> {productDetails.availability}</p>
                            <p className="product-item-info"><span>Brand:</span> {productDetails.brand}</p>

                            <hr className="product-item-line"/>

                            <div className="product-item-quantity-adjustment">
                                <button className="product-item-quantity-btn">-</button>
                                <p className="product-item-quantity">1</p>
                                <button className="product-item-quantity-btn">+</button>
                            </div>

                            <button className="product-item-cart-add-btn">ADD TO CART</button>
                        </div>
                    </section>

                    <div className="similar-products-content">
                        <h2 className="similar-products-heading">
                            Similar Products
                        </h2>

                        <SimilarProductsList similarProductInfo={productDetails.similarProducts}/> 
                    </div>
                </div>
            </div>
        )
    }

    renderFailureView = () => {
        return (
            <div className="product-item-failure">
                <div className="product-item-failure-content">
                    <img src="https://dummyimage.com/600x400/000/fff" alt="product-item-failure-image" className="product-item-failure-image" />
                    <h1 className="product-item-failure-heading">Product Not Found</h1>
                    <Link to="/products">
                        <button className="product-item-failure-back-btn">
                            Continue Shopping
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    renderLoader = () => {
        return (
            <div className="product-item-loader-con">
                <ThreeDots color="#ba864d" />
            </div>
        )
    }

    renderSwitch = () => {
        const { apiStatus } = this.state;

        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderSuccessView();
            case apiStatusConstants.failure:
                return this.renderFailureView();
            case apiStatusConstants.inProgress:
                return this.renderLoader();
        }
    }

    componentDidMount() {
        this.getProductDetailsData();
    }

    render() {
        return (
            <>
                <NavBar />

                {this.renderSwitch()}
            </>
        )
    }
}

export default ProductItemDetails;