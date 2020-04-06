import { DELETE_PRODUCT } from '../constants/actionIndentifier';

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};
