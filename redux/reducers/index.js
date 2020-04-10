import { combineReducers } from 'redux';
import productReducers from './product';
import cartReducers from './cart';
import orderReducers from './order';
import authReducers from './auth';

export const rootReducers = combineReducers({
  products: productReducers,
  cart: cartReducers,
  orders: orderReducers,
  auth: authReducers,
});
