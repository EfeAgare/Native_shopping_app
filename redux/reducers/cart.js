import { ADD_TO_CART } from '../constants/actionIndentifier';
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

      const newOrUpdatedCartItem;

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
    
    default:
      return state;
  }
};

export default cartReducers;
