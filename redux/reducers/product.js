import PRODUCTS from '../../data/dummy-data';
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT,
} from '../constants/actionIndentifier';
import Product from '../../models/products';

const initialState = {
  availableProduct: PRODUCTS,
  userProduct: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

const productReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        availableProduct: action.products,
        userProduct: action.products.filter((prod) => prod.ownerId === 'u1'),
      };
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

    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.product.id,
        'u1',
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );

      return {
        ...state,
        availableProduct: state.availableProduct.concat(newProduct),
        userProduct: state.userProduct.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const index = state.userProduct.findIndex(
        (prod) => prod.id === action.id
      );
      const updateProduct = new Product(
        action.id,
        state.userProduct[index].ownerId,
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        state.userProduct[index].price
      );
      const updateUserProduct = [...state.userProduct];

      updateUserProduct[index] = updateProduct;

      const availableProductIndex = state.availableProduct.findIndex(
        (prod) => prod.id === action.id
      );
      const updateAvailableProduct = [...state.availableProduct];

      updateAvailableProduct[availableProductIndex] = updateProduct;

      return {
        ...state,
        availableProduct: updateAvailableProduct,
        userProduct: updateUserProduct,
      };

    default:
      return state;
  }
};

export default productReducers;
