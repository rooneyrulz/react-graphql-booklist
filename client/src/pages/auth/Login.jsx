import React from 'react';

// Components
import AuthForm from '../../components/AuthForm';

const Login = () => {
  return (
    <div className='page__login'>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;
