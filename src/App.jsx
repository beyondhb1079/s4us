import './App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ViewScholarship from './pages/ViewScholarship';
import ListScholarships from './pages/ListScholarships';
import About from './pages/About';
import Contact from './pages/Contact';
import AddScholarship from './pages/AddScholarship';
import theme from './theme';
import { BRAND_NAME } from './config/constants';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoginDialog from './components/LoginDialog';
import ShareDialog from './components/ShareDialog';

function App() {
  return (
    <FirebaseProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Helmet
          titleTemplate={`%s | ${BRAND_NAME}`}
          defaultTitle={
            BRAND_NAME + ' | Scholarships for Undocumented Students'
          }
        />
        <Router>
          <Header />
          <Switch>
            <ProtectedRoute
              path="/scholarships/new"
              component={AddScholarship}
            />
            <Route path="/scholarships/:id" component={ViewScholarship} />
            <Route path="/scholarships" component={ListScholarships} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/" component={Home} />
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
