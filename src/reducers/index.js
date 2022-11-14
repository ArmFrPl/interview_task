import {combineReducers} from "redux";
import categoryReducer from "./categoryReducer";
import imageReducer from "./imageReducer";

export default combineReducers({
  images: imageReducer,
  categories: categoryReducer,
});