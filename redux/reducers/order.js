import { ADD_ORDER, GET_ORDERS } from '../constants/actionIndentifier';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        action.orders.id,
        action.orders.items,
        action.orders.amount,
        action.orders.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    
    case GET_ORDERS: 
      return {
        orders: action.orders
      }
    default:
      return state;
  }
};

export default orderReducers;
