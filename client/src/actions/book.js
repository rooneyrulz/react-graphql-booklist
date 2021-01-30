import axios from 'axios';
import {
  GET_BOOK,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  REMOVE_BOOK,
  BOOK_ERROR,
} from '../actions/types';

//   Get All Books
export const getBooks = () => async (dispatch) => {
  const body = JSON.stringify({
    query: `
        query {
          books {
            _id
            name
            description
            publishedAt
            author {
              _id
              email
              date
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
    if (res.data.data.books) {
      dispatch({
        type: GET_BOOKS,
        payload: res.data.data.books,
      });
      // dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'GET_BOOKS_FAIL',
          }))
        : [];
      dispatch({ type: BOOK_ERROR, payload: errors });
      // dispatch(
      //   setAlert({
      //     msg: errors[0].msg,
      //     status: 409,
      //     alertType: 'LOGIN_FAIL',
      //   })
      // );
    }
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          type: 'GET_BOOKS_FAIL',
        },
      ],
    });
    // dispatch(
    //   setAlert({
    //     msg: 'Something went wrong!',
    //     status: 500,
    //     alertType: 'LOGIN_FAIL',
    //   })
    // );
  }
};

//   Get Book By Id
export const getBook = (id) => async (dispatch) => {
  const body = JSON.stringify({
    query: `
        query {
          book(id: ${id}) {
            _id
            name
            description
            publishedAt
            author {
              _id
              email
              date
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
    if (res.data.data.book) {
      dispatch({
        type: GET_BOOK,
        payload: res.data.data.book,
      });
      // dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'GET_BOOK_FAIL',
          }))
        : [];
      dispatch({ type: BOOK_ERROR, payload: errors });
      // dispatch(
      //   setAlert({
      //     msg: errors[0].msg,
      //     status: 409,
      //     alertType: 'LOGIN_FAIL',
      //   })
      // );
    }
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          type: 'GET_BOOK_FAIL',
        },
      ],
    });
    // dispatch(
    //   setAlert({
    //     msg: 'Something went wrong!',
    //     status: 500,
    //     alertType: 'LOGIN_FAIL',
    //   })
    // );
  }
};

//   Create New Books
export const createBook = (data) => async (dispatch) => {
  const body = JSON.stringify({
    query: `
        mutation {
          createBook(bookInput: ${data}) {
            _id
            name
            description
            publishedAt
            author {
              _id
              email
              date
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
    if (res.data.data.createBook) {
      dispatch({
        type: CREATE_BOOK,
        payload: res.data.data.createBook,
      });
      // dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'CREATE_BOOK_FAIL',
          }))
        : [];
      dispatch({ type: BOOK_ERROR, payload: errors });
      // dispatch(
      //   setAlert({
      //     msg: errors[0].msg,
      //     status: 409,
      //     alertType: 'LOGIN_FAIL',
      //   })
      // );
    }
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          type: 'CREATE_BOOK_FAIL',
        },
      ],
    });
    // dispatch(
    //   setAlert({
    //     msg: 'Something went wrong!',
    //     status: 500,
    //     alertType: 'LOGIN_FAIL',
    //   })
    // );
  }
};

//   Update Existing Books
export const updateBook = (id, data) => async (dispatch) => {
  const body = JSON.stringify({
    query: `
        mutation {
          updateBook(id: ${id}, bookInput: ${data}) {
            _id
            name
            description
            publishedAt
            author {
              _id
              email
              date
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
    if (res.data.data.updateBook) {
      dispatch({
        type: UPDATE_BOOK,
        payload: res.data.data.updateBook,
      });
      // dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'UPDATE_BOOK_FAIL',
          }))
        : [];
      dispatch({ type: BOOK_ERROR, payload: errors });
      // dispatch(
      //   setAlert({
      //     msg: errors[0].msg,
      //     status: 409,
      //     alertType: 'LOGIN_FAIL',
      //   })
      // );
    }
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          type: 'UPDATE_BOOK_FAIL',
        },
      ],
    });
    // dispatch(
    //   setAlert({
    //     msg: 'Something went wrong!',
    //     status: 500,
    //     alertType: 'LOGIN_FAIL',
    //   })
    // );
  }
};

//   Remove Existing Books
export const removeBook = (id) => async (dispatch) => {
  const body = JSON.stringify({
    query: `
        mutation {
          removeBook(id: ${id})
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
    if (res.data.data.removeBook) {
      dispatch({
        type: REMOVE_BOOK,
        payload: res.data.data.removeBook,
      });
      // dispatch(clearAlerts());
    } else {
      const errors = res.data.errors
        ? res.data.errors.map((err) => ({
            msg: err.message,
            status: 409,
            type: 'REMOVE_BOOK_FAIL',
          }))
        : [];
      dispatch({ type: BOOK_ERROR, payload: errors });
      // dispatch(
      //   setAlert({
      //     msg: errors[0].msg,
      //     status: 409,
      //     alertType: 'REMOVE_BOOK_FAIL',
      //   })
      // );
    }
  } catch (error) {
    dispatch({
      type: BOOK_ERROR,
      payload: [
        {
          msg: 'Something went wrong!',
          status: 500,
          type: 'REMOVE_BOOK_FAIL',
        },
      ],
    });
    // dispatch(
    //   setAlert({
    //     msg: 'Something went wrong!',
    //     status: 500,
    //     alertType: 'REMOVE_BOOK_FAIL',
    //   })
    // );
  }
};
