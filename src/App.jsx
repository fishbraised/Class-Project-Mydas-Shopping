import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import CartContext from "./context/CartContext";

import LoginForm from "./components/LoginForm";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import ProductItemDetails from "./components/ProductItemDetails"
import CartPage from "./components/CartPage";
import NotFound from "./components/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { Component } from "react";

class App extends Component {
  state = { cartList: [] };

  addCartItem = (product) => {
    let { cartList } = this.state;

    let result = cartList.find((eachObj) => eachObj.id === product.id);

    if (result) {
      result.quantity += product.quantity;
    } else {
      cartList = [...cartList, product]
    }

    this.setState({ cartList: [...cartList] })
  }

  removeCartItem = (product) => {
    const { cartList } = this.state;
    
    const tempCartList = cartList;
    const productIndex = cartList.findIndex((eachObj) => eachObj.id === product);

    tempCartList.splice(productIndex, 1);

    this.setState({ cartList: tempCartList });
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  decreaseItemQuantity = (product) => {
    let { cartList } = this.state;

    let result = cartList.find((eachObj) => eachObj.id === product.id);

    if (result && result.quantity > 1) {
      result.quantity -= 1;
    } else if (result.quantity <= 1) {
      const tempCartList = cartList;
      const productIndex = tempCartList.findIndex((eachObj) => eachObj.id === product.id);

      tempCartList.splice(productIndex, 1);
    }

    this.setState({ cartList: [...cartList] })


    // const updatedCartList = cartList.map((eachObj) => {
    //   if (eachObj.id === product.id) {
    //     return { ...eachObj, quantity: eachObj.quantity -= 1 };
    //   } else {
    //     return eachObj;
    //   };
    // });

    // this.setState({ cartList: updatedCartList});
  }

  increaseItemQuantity = (product) => {
    let { cartList } = this.state;

    let result = cartList.find((eachObj) => eachObj.id === product.id);

    if (result) {
      result.quantity += 1;
    }

    this.setState({ cartList: [...cartList]})
  }

  render() {
    const { cartList } = this.state;
    // console.log("cartList: ", cartList);
    // this.removeCartItem();

    return (
      <BrowserRouter>
        <CartContext.Provider value={{cartList, addCartItem: this.addCartItem, removeCartItem: this.removeCartItem, removeAllCartItems: this.removeAllCartItems, decreaseItemQuantity: this.decreaseItemQuantity, increaseItemQuantity: this.increaseItemQuantity }}>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/products" component={ProductsPage} />
            <ProtectedRoute exact path="/product-details/:id" component={ProductItemDetails} />
            <ProtectedRoute exact path="/cart" component={CartPage} />
            {/* <Route component={NotFound} /> */}
            {/* <NotFound /> */}
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
};

export default App;
