import { ADD_ORDER, GET_ORDERS } from '../constants/actionIndentifier';
import { sendHttpRequest } from '../utils/apiInstance';
import Order from '../../models/order';

export const addOrders = (cartItems, totalAmount) => {
  return async (dispatch) => {
    try {
      const date = new Date();
      const orders = await sendHttpRequest(
        '/orders/u1.json',
        'POST',
        JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
        { 'content-type': 'application/json' }
      );

      dispatch({
        type: ADD_ORDER,
        orders: {
          id: orders.name,
          items: cartItems,
          amount: totalAmount,
          date: date,
        },
      });
    } catch (error) {
      throw error.message;
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const orders = await sendHttpRequest('/orders/u1.json', 'GET');

      const loadedOrders = [];
      for (const key in orders) {
        loadedOrders.push(
          new Order(
            key,
            orders[key].cartItems,
            orders[key].totalAmount,
            new Date(orders[key].date)
          )
        );
      }
      dispatch({
        type: GET_ORDERS,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error.message;
    }
  };
};
