import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { loginUser, registerUser } from '../actions/auth';

const AuthForm = ({ isLogin = false, loginUser, registerUser }) => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    isLogin
      ? loginUser({ email, password })
      : registerUser({ email, password });
  };

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={(e) => onChange(e)}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Password'
          onChange={(e) => onChange(e)}
        />
      </Form.Group>
      <Button
        variant='primary'
        type='submit'
        className={isLogin ? 'btn__login' : 'btn__register'}
      >
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Button>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser, registerUser })(AuthForm);
