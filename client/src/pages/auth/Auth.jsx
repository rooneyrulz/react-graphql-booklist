import React from 'react';

// Redux
import { connect } from 'react-redux';
import { clearAlerts } from '../../actions/alert';

// Components
import AuthForm from '../../components/AuthForm';

const Auth = ({ clearAlerts }) => {
  const [isChecked, setIsChecked] = React.useState(true);
  const onChange = (e) => {
    setIsChecked((prev) => !prev);
    clearAlerts();
  };

  return (
    <div className='page__auth'>
      <div className='container'>
        <div className='header'>
          <h1> {isChecked ? 'Sign In' : 'Sign Up'}</h1>
          <label className='switch'>
            <input
              type='checkbox'
              checked={isChecked}
              onChange={(e) => onChange(e)}
            />
            <span className='slider round'></span>
          </label>
        </div>

        <AuthForm isLogin={isChecked} />
      </div>
    </div>
  );
};

export default connect(null, { clearAlerts })(Auth);
