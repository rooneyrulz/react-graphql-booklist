import React from 'react';

// Redux
import { connect } from 'react-redux';
import { getBooks } from '../actions/book';

const Books = ({ getBooks }) => {
  React.useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className='page__books'>
      <div className='container'>
        <h1>Books</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getBooks })(Books);
