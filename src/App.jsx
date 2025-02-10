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
    this.setState((prevState) => ({
      cartList: [...prevState.cartList, product],
    }))
  }

  removeCartItem = (product) => {
    
  }

  render() {
    const { cartList } = this.state;
    console.log(cartList);

    return (
      <BrowserRouter>
        <CartContext.Provider value={{cartList, addCartItem: this.addCartItem, removeCartItem: this.removeCartItem}}>
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
