import {FETCH_CATEGORIES, SET_CATEGORY} from "../actions/types";

const DEFAULT_STATE = {
  categories: [],
  currentCategory: 1,
}

export default (state = DEFAULT_STATE, action) => {

  if (action.type === FETCH_CATEGORIES) {
    return {
      ...state,
      categories: action.payload
    }
  }
  if(action.type === SET_CATEGORY){
    return {
      ...state,
      currentCategory: action.payload
    }
  }
  return state;
}