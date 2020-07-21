import { LOAD_RESTAURANTS, RESTAURANT_VOTE_FAIL } from "../actions/types";

const initialState = {
  restaurantsList: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const {type, payload} = action;

  switch(type) {
    case LOAD_RESTAURANTS:
      return {
        ...state,
        loading: false,
        restaurantsList: payload,
      };
    case RESTAURANT_VOTE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state;
  }
}