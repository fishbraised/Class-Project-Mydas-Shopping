import NavBar from '../NavBar';
import EmptyCartView from '../EmptyCartView';
import CartListView from '../CartListView';
import CartSummary from '../CartSummary';

import CartContext from '../../context/CartContext';

import './index.css';

const CartPage = () => (
  <CartContext.Consumer>
    {(value) => {
      const  { cartList, removeAllCartItems } = value;
      const showEmptyView = cartList.length === 0;
      
      const onRemoveAllCartItems = () => {
        removeAllCartItems();
      }

      return (
        <>
          <NavBar />

          <div className="cart-container">
            <div className="cart-content-container">
              <h1 className="cart-heading">My Cart</h1>
                {
                  showEmptyView ? <EmptyCartView /> : (<div>
                    <button className="cart-remove-all-btn" onClick={onRemoveAllCartItems}>Remove All</button>
                    <CartListView /> 
                    <CartSummary />
                  </div>)
                }

            </div>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
);

export default CartPage;
