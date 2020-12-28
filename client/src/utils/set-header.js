import axios from 'axios';

export default (token) => {
  if (token) {
    return (axios.defaults.headers.common['x-auth-token'] = `token ${token}`);
  } else {
    return delete axios.defaults.headers.common['x-auth-token'];
  }
};
