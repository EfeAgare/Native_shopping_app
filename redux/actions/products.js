import {
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  CREATE_PRODUCT,
} from '../constants/actionIndentifier';

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    id: id,
    product: {
      title,
      imageUrl,
      description,
    },
  };
};

export const createProduct = (title, imageUrl, price, description) => {
  console.log('action-create', title);
  return {
    type: CREATE_PRODUCT,
    product: {
      title,
      price,
      imageUrl,
      description,
    },
  };
};
