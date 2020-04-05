import { ADD_ORDER } from '../constants/actionIndentifier';
import Order from '../../models/order';

const initialState = {
  orders: [],
};

const orderReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orders.items,
        action.orders.amount,
        new Date()
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};

export default orderReducers;
