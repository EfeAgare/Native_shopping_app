import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_ORDER,
} from '../constants/actionIndentifier';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let newOrUpdatedCartItem;

      if (state.items[addedProduct.id]) {
        newOrUpdatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        newOrUpdatedCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: newOrUpdatedCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const selectecCartItem = state.items[action.productId];
      const currentQty = selectecCartItem.quantity;

      let updateCartItems;
      if (currentQty > 1) {
        const updateCartItem = new CartItem(
          currentQty - 1,
          selectecCartItem.productPrice,
          selectecCartItem.productTitle,
          selectecCartItem.sum - selectecCartItem.productPrice
        );

        updateCartItems = {
          ...state.items,
          [action.productId]: updateCartItem,
        };
      } else {
        updateCartItems = { ...state.items };
        delete updateCartItems[action.productId];
      }

      return {
        ...state,
        items: updateCartItems,
        totalAmount: state.totalAmount - selectecCartItem.productPrice,
      };

    case ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};

export default cartReducers;
