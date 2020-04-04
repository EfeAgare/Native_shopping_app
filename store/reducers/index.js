import { combineReducers } from "redux";
import productReducers from "./product";

export const rootReducers = combineReducers({
  products: productReducers,
});
