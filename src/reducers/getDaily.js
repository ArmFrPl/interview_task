import {GET_BY_LOCATION_DAILY, GET_DAILY} from "../actions/types";

const DEFAULT_STATE = {
  days: [],
}

export default (state = DEFAULT_STATE, action) => {

  if (action.type === GET_DAILY) {
    return {
      ...state,
      days: action.payload
    }
  }
  if (action.type === GET_BY_LOCATION_DAILY) {
    return {
      ...state,
      days: action.payload
    }
  }
  return state;
}