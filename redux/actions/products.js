import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
  GET_ALL_PRODUCT,
} from '../constants/actionIndentifier';
import { sendHttpRequest } from '../utils/apiInstance';
import Product from '../../models/products';

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await sendHttpRequest(`/products/${id}.json?auth=${token}`, 'DELETE');
      return dispatch({ type: DELETE_PRODUCT, productId: id });
    } catch (error) {}
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await sendHttpRequest(
        `/products/${id}.json?auth=${token}`,
        'PATCH',
        JSON.stringify({
          title,
          imageUrl,
          description,
        }),
        { 'content-type': 'application/json' }
      );

      dispatch({
        type: UPDATE_PRODUCT,
        id: id,
        product: {
          title,
          imageUrl,
          description,
        },
      });
    } catch (error) {
      throw error.message;
    }
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    const { token, userId } = getState().auth;
    try {
      const product = await sendHttpRequest(
        `/products.json?auth=${token}`,
        'POST',
        JSON.stringify({
          title,
          imageUrl,
          description,
          price,
          ownerId: userId,
        }),
        { 'content-type': 'application/json' }
      );

      dispatch({
        type: CREATE_PRODUCT,
        product: {
          id: product.name,
          title,
          price,
          imageUrl,
          description,
          ownerId: userId,
        },
      });
    } catch (error) {
      throw error.mesage;
    }
  };
};

export const fetchAllProduct = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const products = await sendHttpRequest('/products.json', 'GET');

      const loadedProducts = [];

      for (const key in products) {
        loadedProducts.push(
          new Product(
            key,
            products[key].ownerId,
            products[key].title,
            products[key].imageUrl,
            products[key].description,
            products[key].price
          )
        );
      }
      dispatch({
        type: GET_ALL_PRODUCT,
        products: loadedProducts,
        ownerId: userId,
      });
    } catch (error) {
      throw error.message;
    }
  };
};
