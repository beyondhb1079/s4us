import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import FirebaseConfig from './config/FirebaseConfig';
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

function RouteWithTitle({ path, component, title }) {
  useEffect(() => {
    document.title = `${BRAND_NAME} | ${title}`;
  }, [title]);
  return <Route {...{ path, component }} />;
}
RouteWithTitle.propTypes = {
  component: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const routes = [
  {
    path: '/scholarships/new',
    component: ScholarshipForm,
    title: 'Add a scholarship',
  },
  {
    path: '/scholarships/:id',
    component: ScholarshipDetails,
    title: 'Details',
  },
  { path: '/scholarships', component: Scholarships, title: 'Scholarships' },
  { path: '/about', component: About, title: 'About' },
  { path: '/contact', component: Contact, title: 'Contact' },
  { path: '/', component: Home, title: 'Home' },
];

function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(FirebaseConfig);
  }

  useEffect(() => {
    document.title = `${BRAND_NAME} | Scholarships for Undocumented Students`;
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Switch>
          {routes.map(({ path, component, title }) => (
            <RouteWithTitle {...{ path, component, title }} />
          ))}
        </Switch>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
