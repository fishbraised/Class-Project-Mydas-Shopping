import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import { Component } from "react";

import ProductCard from "../ProductCard";
import ProductsHeader from "../ProductsHeader";
import FiltersGroup from "../FiltersGroup";

import "./index.css";

const sortByOptions = [
  {
    optionID: "PRICE_HIGH",
    displayText: "Price (High-Low)",
  },

  {
    optionID: "PRICE_LOW",
    displayText: "Price (Low-High)",
  },
];

const categoryOptions = [
  {
    categoryID: 1,
    categoryText: "Clothing",
  },

  {
    categoryID: 2,
    categoryText: "Electronics",
  },

  {
    categoryID: 3,
    categoryText: "Appliances",
  },

  {
    categoryID: 4,
    categoryText: "Grocery",
  },

  {
    categoryID: 5,
    categoryText: "Toys",
  },
];

const ratingsList = [
  {
    ratingID: 4,
    imgURL:
      "https://res.cloudinary.com/dkoqbt4pc/image/upload/v1731325538/Mydas%20Shopping/rating-four-stars-img_gqeq1y.png",
  },

  {
    ratingID: 3,
    imgURL:
      "https://res.cloudinary.com/dkoqbt4pc/image/upload/v1731325543/Mydas%20Shopping/rating-three-stars-img_yooweu.png",
  },

  {
    ratingID: 2,
    imgURL:
      "https://res.cloudinary.com/dkoqbt4pc/image/upload/v1731325544/Mydas%20Shopping/rating-two-stars-img_mvuvef.png",
  },

  {
    ratingID: 1,
    imgURL:
      "https://res.cloudinary.com/dkoqbt4pc/image/upload/v1731325547/Mydas%20Shopping/rating-one-star-img_dcu25s.png",
  },
];

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionID: sortByOptions[1].optionID,
    searchText: "",
    activeCategoryID: "",
    activeRatingID: "",
    isLoading: false,
  };

  updateActiveOption = (optionID) => {
    this.setState({ activeOptionID: optionID }, this.getAllProducts);
  };

  updateSearchText = (searchText) => {
    this.setState({ searchText: searchText });
  };

  triggerSearch = () => {
    this.getAllProducts();
  };

  updateActiveCategory = (categoryID) => {
    this.setState({ activeCategoryID: categoryID }, this.getAllProducts);
  };

  updateActiveRating = (ratingID) => {
    // If the callback function is getAllProducts, the result doesn't appear.
    console.log(ratingID);
    this.setState({ activeRatingID: ratingID }, this.getAllProducts);
  };

  // consoleFunction = () => {
  //   // Testing method to check what is in activeRatingID

  //   const { activeRatingID } = this.state;
  //   console.log("This is updateActiveRating:", activeRatingID);
  // };

  getAllProducts = async () => {
    this.setState({ isLoading: true });

    const { activeOptionID, searchText, activeCategoryID, activeRatingID } =
      this.state;
    const URL = `https://apis.ccbp.in/products?sort_by=${activeOptionID}&category=${activeCategoryID}&title_search=${searchText}&rating=${activeRatingID}`;

    console.log(URL);
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

      const formattedData = data.products.map((eachObj) => {
        return {
          id: eachObj.id,
          title: eachObj.title,
          imgUrl: eachObj.image_url,
          brand: eachObj.brand,
          price: eachObj.price,
          rating: eachObj.rating,
        };
      });

      this.setState({ productsList: formattedData, isLoading: false });
    }
  };

  renderLoader = () => {
    return (
      <div className="all-products-loader-con">
        <ThreeDots color="#ba864d" />
      </div>
    );
  };

  renderProducts = () => {
    const { productsList, activeOptionID } = this.state;

    return (
      <div>
        <ProductsHeader
          sortByOptions={sortByOptions}
          activeOptionID={activeOptionID}
          updateActiveOption={this.updateActiveOption}
        />
        <ul className="all-products-cards-con">
          {productsList.map((eachObj) => (
            <ProductCard key={eachObj.id} productInfo={eachObj} />
          ))}
        </ul>
      </div>
    );
  };

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    const { searchText, activeCategoryID, isLoading } = this.state;

    return (
      <div className="all-products-section">
        <FiltersGroup
          updateSearchText={this.updateSearchText}
          searchText={searchText}
          triggerSearch={this.triggerSearch}
          categoryOptions={categoryOptions}
          activeCategoryID={activeCategoryID}
          updateActiveCategory={this.updateActiveCategory}
          ratingsList={ratingsList}
          updateActiveRating={this.updateActiveRating}
        />
        <div>{isLoading ? this.renderLoader() : this.renderProducts()}</div>
      </div>
    );
  }
}

export default AllProductsSection;
