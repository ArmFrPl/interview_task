import {combineReducers} from "redux";
import getDaily from "./getDaily";
import getCurrent from "./getCurrent";
import getCity from "./getCity";

export default combineReducers({
  current: getCurrent,
  daily: getDaily,
  city: getCity,
});