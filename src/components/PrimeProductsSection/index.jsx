import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { Component } from "react";

import ProductCard from "../ProductCard";
import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class PrimeProductsSection extends Component {
  state = { primeProducts: [], apiStatus: apiStatusConstants.initial };

  getPrimeProducts = async () => {
    this.setState({ apiStatus: apiStatusConstants.inProgress });

    const URL = "https://apis.ccbp.in/prime-deals";
    const jwtToken = Cookies.get("jwt_token");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const response = await fetch(URL, options);

    if (response.ok) {
      const data = await response.json();

      const formattedData = data.prime_deals.map((eachObj) => {
        return {
          id: eachObj.id,
          title: eachObj.title,
          imgUrl: eachObj.image_url,
          brand: eachObj.brand,
          price: eachObj.price,
          rating: eachObj.rating,
        };
      });

      this.setState({
        primeProducts: formattedData,
        apiStatus: apiStatusConstants.success,
      });
    } else if (response.status === 401) {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  renderFailureView = () => {
    return (
      <div>
        <img
          className="failure-banner"
          src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1730629186/Backgrounds/mydas-prime-bg.webp"
          alt="mydas prime bg"
        ></img>
      </div>
    );
  };

  renderPrimeProducts = () => {
    const { primeProducts } = this.state;

    return (
      <div>
        <div className="prime-products-header-con">
          <h1>Prime Products</h1>
        </div>

        <ul className="prime-products-cards-con">
          {primeProducts.map((eachObj) => (
            <ProductCard key={eachObj.id} productInfo={eachObj} />
          ))}
        </ul>
      </div>
    );
  };

  renderLoader = () => {
    return (
      <div className="prime-products-loader-con">
        <ThreeDots color="#ba864d" />
      </div>
    );
  };

  componentDidMount = () => {
    this.getPrimeProducts();
  };

  render() {
    const { apiStatus } = this.state;

    // return {
    //   {apiStatus === "SUCCESS"
    //       ? this.renderPrimeProducts()
    //       : this.renderFailureView()}
    // };

    switch (apiStatus) {
      case "SUCCESS":
        return this.renderPrimeProducts();

      case "FAILURE":
        return this.renderFailureView();

      case "IN_PROGRESS":
        return this.renderLoader();

      default:
        return null;
    }
  }
}

export default PrimeProductsSection;
