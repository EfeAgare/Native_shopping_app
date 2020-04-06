import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../constants/actionIndentifier';

const initialState = {
  availableProduct: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        userProduct: state.userProduct.filter(
          (prod) => prod.id !== action.productId
        ),
        availableProduct: state.availableProduct.filter(
          (prod) => prod.id !== action.productId
        ),
      };

    default:
      return state;
  }
};

export default productReducers;
