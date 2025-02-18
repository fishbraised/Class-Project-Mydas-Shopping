import React from 'react';

const CartContext = React.createContext({
    cartList: [],
    addCartItem: () => {},
    removeCartItem: () => {},
    // increaseCartItemQuantity: () => {},
    // decreaseCartItemQuantity: () => {},
})

export default CartContext;