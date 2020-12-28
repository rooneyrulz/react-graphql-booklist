import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

const PublicRoute = ({
  component: Component,
  auth: { loading, isAuthenticated },
  ...rest
}) => {
  return (
    <Route
      render={(props) => {
        if (loading) {
          return <p>Loading</p>;
        } else if (isAuthenticated) {
          return <Redirect to='/dashboard' />;
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

export default connect(mapStateToProps)(PublicRoute);
