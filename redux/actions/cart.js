import { ADD_TO_CART, REMOVE_FROM_CART } from '../constants/actionIndentifier';

// action creator
export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};
export const removeFromCart = (productId) => {
  return { type: REMOVE_FROM_CART, productId: productId };
};
