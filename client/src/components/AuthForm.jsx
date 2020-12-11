import React from 'react';
import { Form, Button } from 'react-bootstrap';

const AuthForm = ({ isLogin = false }) => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });

  const onChange = (e) =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = (e) => {
    e.preventDefault();
    isLogin ? console.log('Login') : console.log('Register');
    console.log(formData);
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
      <Button variant='primary' type='submit'>
        {isLogin ? 'Login' : 'Register'}
      </Button>
    </Form>
  );
};

export default AuthForm;
