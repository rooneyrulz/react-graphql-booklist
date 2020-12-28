import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { loadUser } from './actions/auth';

// Layouts
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';
import NotFound from './pages/NotFound';
import Auth from './pages/auth/Auth';

import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';
import setHeader from './utils/set-header';

if (localStorage.token) setHeader(localStorage.token);

const App = ({ auth: { loading }, loadUser }) => {
  React.useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    !loading && (
      <Router>
        <>
          <AppHeader />
          <main>
            <Switch>
              <PublicRoute exact path='/' component={Home} />
              <PublicRoute exact path='/books' component={Books} />
              <PublicRoute exact path='/auth' component={Auth} />
              <PrivateRoute exact path='/my-books' component={MyBooks} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </>
      </Router>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(App);
