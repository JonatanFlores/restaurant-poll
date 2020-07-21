import api from '../services/api';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const response = await api.get('/me');

    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async dispatch => {
  try {
    const response = await api.post('/sessions', { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });

    dispatch(loadUser());
  } catch ({ response }) {
    const errors = response.data;

    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
