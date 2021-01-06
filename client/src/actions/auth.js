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
import { setAlert, clearAlerts } from './alert';

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
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 401,
            type: 'AUTH_ERROR',
          }))
        : [];
      dispatch({ type: AUTH_ERROR, payload: errors });
    }
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          alertType: 'AUTH_ERROR',
        },
      ],
    });
  }
};

// Login User
export const loginUser = ({ email, password }) => async (dispatch) => {
  if (!email.trim() || !password.trim())
    return (
      dispatch({
        type: LOGIN_FAIL,
        payload: [
          {
            msg: 'Invalid fields!',
            status: 400,
            alertType: 'LOGIN_FAIL',
          },
        ],
      }),
      dispatch(
        setAlert({
          msg: 'Invalid fields!',
          status: 400,
          alertType: 'LOGIN_FAIL',
        })
      )
    );

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
      dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'LOGIN_FAIL',
          }))
        : [];
      dispatch({ type: LOGIN_FAIL, payload: errors });
      dispatch(
        setAlert({
          msg: errors[0].msg,
          status: 409,
          alertType: 'LOGIN_FAIL',
        })
      );
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          alertType: 'LOGIN_FAIL',
        },
      ],
    });
    dispatch(
      setAlert({
        msg: 'Something went wrong!',
        status: 500,
        alertType: 'LOGIN_FAIL',
      })
    );
  }
};

// Register User
export const registerUser = ({ email, password }) => async (dispatch) => {
  if (!email.trim() || !password.trim())
    return (
      dispatch({
        type: REGISTER_FAIL,
        payload: [
          {
            msg: 'Invalid fields!',
            status: 400,
            alertType: 'REGISTER_FAIL',
          },
        ],
      }),
      dispatch(
        setAlert({
          msg: 'Invalid fields!',
          status: 400,
          alertType: 'REGISTER_FAIL',
        })
      )
    );

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
      dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'REGISTER_FAIL',
          }))
        : [];
      dispatch({ type: REGISTER_FAIL, payload: errors });
      dispatch(
        setAlert({
          msg: errors[0].msg,
          status: 409,
          alertType: 'REGISTER_FAIL',
        })
      );
    }
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          alertType: 'REGISTER_FAIL',
        },
      ],
    });
    dispatch(
      setAlert({
        msg: 'Something went wrong!',
        status: 500,
        alertType: 'REGISTER_FAIL',
      })
    );
  }
};

// Logout User
export const logoutUser = () => (dispatch) =>
  dispatch({ type: LOGOUT, payload: [] });
