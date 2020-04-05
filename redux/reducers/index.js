import { combineReducers } from 'redux';
import productReducers from './product';
import cartReducers from './cart';

export const rootReducers = combineReducers({
  products: productReducers,
  cart: cartReducers,
});
