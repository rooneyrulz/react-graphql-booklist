import React from 'react';
import { connect } from 'react-redux';

import AlertItem from './AlertItem';

const Alert = ({ alerts }) => {
  return alerts.length ? (
    <div className='container'>
      {alerts.map((alert) => (
        <AlertItem alert={alert} key={alert.id} />
      ))}
    </div>
  ) : (
    <></>
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
