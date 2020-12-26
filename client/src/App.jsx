import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import store from './store';

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

const App = () => {
  return (
    <Router>
      <>
        <AppHeader />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/books' component={Books} />
            <Route exact path='/auth' component={Auth} />
            <PrivateRoute exact path='/my-books' component={MyBooks} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <AppFooter />
      </>
    </Router>
  );
};

export default App;
