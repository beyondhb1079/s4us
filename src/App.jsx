import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Scholarships from './pages/Scholarships';
import About from './pages/About';
import Contact from './pages/Contact';
import ScholarshipForm from './pages/ScholarshipForm';
import theme from './theme';
import { BRAND_NAME } from './config/constants';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoginDialog from './components/LoginDialog';
import ShareDialog from './components/ShareDialog';

function RouteWithTitle({ path, component, title, guard }) {
  useEffect(() => {
    document.title = `${BRAND_NAME} | ${title}`;
  }, [title]);
  return guard ? (
    <ProtectedRoute {...{ path, component }} />
  ) : (
    <Route {...{ path, component }} />
  );
}
RouteWithTitle.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  guard: PropTypes.bool,
};
RouteWithTitle.defaultProps = {
  guard: false,
};

const routes = [
  {
    path: '/scholarships/new',
    title: 'Add a scholarship',
    component: ScholarshipForm,
    guard: true,
  },
  {
    path: '/scholarships/:id',
    title: 'Details',
    component: ScholarshipDetails,
  },
  {
    path: '/scholarships',
    title: 'Scholarships',
    component: Scholarships,
  },
  {
    path: '/about',
    title: 'About',
    component: About,
  },
  {
    path: '/contact',
    title: 'Contact',
    component: Contact,
  },
  {
    path: '/',
    title: 'Home',
    component: Home,
  },
];

function App() {
  useEffect(() => {
    document.title = `${BRAND_NAME} | Scholarships for Undocumented Students`;
  }, []);

  return (
    <FirebaseProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            {routes.map(({ path, component, title, guard }) => (
              <RouteWithTitle
                key={path}
                {...{ path, component, title, guard }}
              />
            ))}
          </Switch>
          <LoginDialog />
          <ShareDialog />
          <Footer />
        </Router>
      </ThemeProvider>
    </FirebaseProvider>
  );
}

export default App;
