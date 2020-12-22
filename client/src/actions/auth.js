import axios from 'axios';
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import setHeader from '../utils/set-header';

// Load the user
const loadUser = () => async (dispatch) => {
  if (localStorage.token) setHeader(localStorage.token);

  try {
    //
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: {} });
  }
};
