import {ADD_IMAGES, FETCH_IMAGES} from "../actions/types";

const DEFAULT_STATE = {
  images:[]
}

export default (state = DEFAULT_STATE, action) => {

  if (action.type === FETCH_IMAGES) {
    return {
      ...state,
      images: action.payload
    }
  }
  if(action.type === ADD_IMAGES){
    return {
      ...state,
      images: [...state.images, ...action.payload]
    }
  }
  return state;
}