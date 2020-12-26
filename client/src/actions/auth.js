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

  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    query: `
      query {
          authUser {}
        }
      `,
  });

  try {
    const res = await axios.get('/', body, config);
  } catch (error) {
    console.log(error);
    dispatch({ type: AUTH_ERROR, payload: {} });
  }
};

// Login User
const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    query: `
      query {
          authenticateUser() {}
        }
      `,
  });

  try {
    const res = await axios.get('/', body, config);
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: {} });
  }
  dispatch(loadUser());
};

// Register User
const registerUser = ({ email, password }) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    query: `
      mutation {
          createUser() {}
        }
      `,
  });

  try {
    const res = await axios.get('/', body, config);
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL, payload: {} });
  }
  dispatch(loadUser());
};

// Logout User
const logoutUser = () => (dispatch) => dispatch({ type: LOGOUT });

export default { loadUser, loginUser, registerUser, logoutUser };
