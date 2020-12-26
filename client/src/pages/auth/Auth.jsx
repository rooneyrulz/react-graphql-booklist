import React from 'react';

// Components
import AuthForm from '../../components/AuthForm';

const Auth = () => {
  const [isChecked, setIsChecked] = React.useState(true);
  const onChange = (e) => setIsChecked((prev) => !prev);

  return (
    <div className='page__auth'>
      <div className='container'>
        <div className='header'>
          <h1> {isChecked ? 'Sign In' : 'Sign Up'}</h1>
          <label class='switch'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={(e) => onChange(e)}
            />
            <span class='slider round'></span>
          </label>
        </div>

        <AuthForm isLogin={isChecked} />
      </div>
    </div>
  );
};

export default Auth;
