import {
  GET_BOOK,
  GET_BOOKS,
  CREATE_BOOK,
  UPDATE_BOOK,
  REMOVE_BOOK,
  BOOK_ERROR,
} from '../actions/types';

const initialState = {
  loading: true,
  books: [],
  book: null,
  errors: [],
};

const bookReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BOOKS:
      return {
        ...state,
        loading: false,
        books: payload,
      };

    case GET_BOOK:
      return {
        ...state,
        loading: false,
        book: payload,
      };

    case CREATE_BOOK:
      return {
        ...state,
        loading: false,
        books: [payload, ...state.books],
      };

    case UPDATE_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.map((book) =>
          book._id === payload.id ? payload.book : book
        ),
      };

    case REMOVE_BOOK:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book._id !== payload),
      };

    case BOOK_ERROR:
      return {
        ...state,
        loading: false,
        errors: [...state.errors, ...payload],
      };

    default:
      return state;
  }
};

export default bookReducer;
