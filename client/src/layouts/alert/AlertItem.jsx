import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertItem = ({ alert }) => {
  return <Alert variant='danger'>{alert.msg}</Alert>;
};

export default AlertItem;
