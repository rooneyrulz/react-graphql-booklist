import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  loading: true,
  token: localStorage.getItem('token'),
  user: {},
  isAuthenticated: null,
  error: {},
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: payload.token,
        user: payload.user,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        token: null,
        user: {},
        error: payload,
      };

    default:
      break;
  }
};

export default authReducer;
