import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Layouts
import AppHeader from './layouts/AppHeader';
import AppFooter from './layouts/AppFooter';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import MyBooks from './pages/MyBooks';

// Auth Pages
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';

const App = () => {
  return (
    <Router>
      <>
        <AppHeader />
        <main className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/books' component={Books} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/my-books' component={MyBooks} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </main>
        <AppFooter />
      </>
    </Router>
  );
};

export default App;
