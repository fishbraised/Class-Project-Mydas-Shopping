import CartContext from '../../context/CartContext';
import './index.css';

const CartSummary = () => (
    <CartContext.Consumer>
        {(value) => {
            const { cartList } = value;

            const cartSummaryValue = cartList.reduce((acc, cur) => {
                return acc += cur.quantity * cur.price;
            }, 0);

            const cartSummaryItemCount = cartList.length;

            return (
                <div className="cart-summary">
                    <div class="cart-summary-content">
                        <h1 class="cart-summary-heading">Order Total: <span class="cart-summary-value">{cartSummaryValue}/-</span></h1>
                        <p class="cart-summary-desc">{cartSummaryItemCount} Items in cart</p>
                        <button type="button" class="cart-summary-checkout-btn">Checkout</button>
                    </div>
                </div>
            )
        }}
    </CartContext.Consumer>



    
)

export default CartSummary;