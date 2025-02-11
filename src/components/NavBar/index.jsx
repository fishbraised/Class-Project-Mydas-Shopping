import { Link, withRouter } from "react-router-dom";
import Cookies from "js-cookie";

import CartContext from "../../context/CartContext";

import "./index.css";

const NavBar = (props) => {
  const renderCartCount = () => (
    <CartContext.Consumer>
      {(value) => {
        const { cartList } = value;
        
        return <span className="cart-count-badge">{cartList.length}</span>
      }}
    </CartContext.Consumer>
  )

  const onLogOut = () => {
    Cookies.remove("jwt_token");

    const { history } = props;

    history.replace("/login");
  };

  return (
    <nav>
      <img
        src="https://res.cloudinary.com/dkoqbt4pc/image/upload/v1726574131/mydas-shopping-logo.png"
        alt="mydas-logo"
      />

      <div>
        <ul>
          <li>
            <Link className="nav-link" to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/products">
              <button>Products</button>
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/cart">
              <button>Cart {renderCartCount()}</button>
            </Link>
          </li>
        </ul>

        <button onClick={onLogOut}>Log-out</button>
      </div>
    </nav>
  );
  
};

export default withRouter(NavBar);
