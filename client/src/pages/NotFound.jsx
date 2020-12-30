import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='page__notfound'>
      <div className='container'>
        <h1>Oops..!</h1>
        <p>
          <i class='far fa-frown fa-9x'></i>
        </p>
        <Link to='/'>Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
