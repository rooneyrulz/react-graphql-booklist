import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      render={(props) => {
        if (loading) {
          return <p>Loading</p>;
        } else if (!isAuthenticated) {
          return <Redirect to='/auth' />;
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
