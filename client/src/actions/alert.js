import { v4 } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

const setAlert = ({ msg, status, alertType }) => async (dispatch) => {
  const id = v4();

  //   Dispatch Set Alert
  dispatch({ type: SET_ALERT, payload: { id, msg, status, type: alertType } });

  //   Dispatch Remove Alert
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 4000);
};

export default setAlert;
