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

const API_URI = 'http://localhost:5000/graphql';

// Load the user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setHeader(localStorage.token);

  const body = JSON.stringify({
    query: `
    query {
      getAuthenticatedUser {
        _id
        email
        date
        books {
          _id
          name
          description
          publishedAt
        }
      }
    }
    `,
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`http://localhost:5000/graphql`, body, config);
    if (res.data.data.getAuthenticatedUser) {
      dispatch({
        type: USER_LOADED,
        payload: res.data.data.getAuthenticatedUser,
      });
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({ type: 'auth', msg: err.message }))
        : [];
      dispatch({ type: AUTH_ERROR, payload: errors });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: [] });
  }
};

// Login User
export const loginUser = ({ email, password }) => async (dispatch) => {
  if (!email.trim() || !password.trim())
    return console.log('Please fill all fields!');

  const body = JSON.stringify({
    query: `
      query {
        authenticateUser(authInput: {email: "${email}", password: "${password}"}) {
          token
        }
      }
      `,
    variables: {},
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`http://localhost:5000/graphql`, body, config);
    if (res.data.data.authenticateUser) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data.authenticateUser,
      });
      dispatch(loadUser());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({ type: 'login', msg: err.message }))
        : [];
      dispatch({ type: LOGIN_FAIL, payload: errors });
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: [] });
  }
};

// Register User
export const registerUser = ({ email, password }) => async (dispatch) => {
  if (!email.trim() || !password.trim())
    return console.log('Please fill all fields!');

  const body = JSON.stringify({
    query: `
      mutation {
        createUser(authInput: {email: "${email}", password: "${password}"}) {
          token
        }
      }
      `,
    variables: {},
  });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(`http://localhost:5000/graphql`, body, config);
    if (res.data.data.createUser) {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.data.createUser,
      });
      dispatch(loadUser());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({ type: 'register', msg: err.message }))
        : [];
      dispatch({ type: REGISTER_FAIL, payload: errors });
    }
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: [] });
  }
};

// Logout User
export const logoutUser = () => (dispatch) =>
  dispatch({ type: LOGOUT, payload: [] });
