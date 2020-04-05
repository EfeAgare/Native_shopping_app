import { ADD_TO_CART } from '../constants/actionIndentifier';


// action creator
export const addToCart = (product) => {
  return { type: ADD_TO_CART, product: product };
};
