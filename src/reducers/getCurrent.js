import {GET_CURRENT, GET_BY_LOCATION_CURRENT} from "../actions/types";

const DEFAULT_STATE = {
  current:[]
}

export default (state = DEFAULT_STATE, action) => {

  if (action.type === GET_CURRENT) {
    return {
      ...state,
      current: action.payload
    }
  }
  if (action.type === GET_BY_LOCATION_CURRENT) {
    return {
      ...state,
      current: action.payload
    }
  }
  return state;
}