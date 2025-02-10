import NavBar from '../NavBar';
import EmptyCartView from '../EmptyCartView';
import CartListView from '../CartListView';

import CartContext from '../../context/CartContext';

import './index.css';

const CartPage = () => (
  <CartContext.Consumer>
    {(value) => {
      const  { CartList } = value;
      console.log("CartList: ", CartList);
      const showEmptyView = CartList.length === 0;
      

      return (
        <>
          <NavBar />
          <div className="cart-container">
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
                {
                  showEmptyView ? <EmptyCartView /> : <CartListView />
                }
            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
);

export default CartPage;
