import api from "../services/api";

import { LOAD_RESTAURANTS, RESTAURANT_VOTE_SUCCESS, RESTAURANT_VOTE_FAIL } from "./types";

export const loadRestaurants = () => async dispatch => {
  const response = await api.get('/restaurants');

  dispatch({
    type: LOAD_RESTAURANTS,
    payload: response.data
  });
};

export const voteForRestaurant = (id) => async dispatch => {
  try {
    const response = await api.post('/polls', {
      restaurant_id: id
    });
  
    dispatch({
      type: RESTAURANT_VOTE_SUCCESS,
      payload: response.data,
    });
  } catch ({response}) {
    const errors = response.data;

    dispatch({
      type: RESTAURANT_VOTE_FAIL,
      payload: errors,
    });
  }
};