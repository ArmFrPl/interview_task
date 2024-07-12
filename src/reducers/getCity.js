import {GET_CITY} from "../actions/types";

const DEFAULT_STATE = {
  city: ''
}

export default (state = DEFAULT_STATE, action) => {

  if (action.type === GET_CITY) {
    return {
      ...state,
      city: action.payload
    }
  }
  return state;
}