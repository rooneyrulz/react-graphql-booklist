import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='page__home'>
      <div className='container flow'>
        <h1>Build Booklists</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore
          aut optio non adipisci corporis praesentium minima ipsa, tempore
          explicabo ipsum.
        </p>
        <Link to='/dashboard' className='btn__home'>
          Let's Build
        </Link>
      </div>
    </div>
  );
};

export default Home;
