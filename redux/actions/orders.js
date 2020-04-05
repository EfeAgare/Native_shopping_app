import { ADD_ORDER } from '../constants/actionIndentifier';

export const addOrders = (cartItems, totalAmount) => {
  return { type: ADD_ORDER, orders: { items: cartItems, amount: totalAmount } };
};
