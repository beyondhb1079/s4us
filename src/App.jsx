import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import React, { createContext } from 'react';
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

const FirebaseContext = createContext(null);

function FirebaseProvider({ children }) {
  if (firebase.apps.length === 0) {
    switch (process.env.NODE_ENV) {
      case 'production':
        firebase.initializeApp(FirebaseConfig);
        break;
      // TODO: consider staging environment
      case 'development':
      case 'test':
      default:
        firebase.initializeApp(FirebaseConfig);
        firebase.firestore().settings({ host: 'localhost:8080', ssl: false });
      // TODO: do we want test environment too?
    }
  }
  return (
    <FirebaseContext.Provider value={true}>{children}</FirebaseContext.Provider>
  );
}

function App() {
  console.log(JSON.stringify(process.env));

  return (
    <FirebaseProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route path="/scholarships/new" component={ScholarshipForm} />
            <Route path="/scholarships/:id" component={ScholarshipDetails} />
            <Route path="/scholarships" component={Scholarships} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/" component={Home} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </FirebaseProvider>
  );
}

export default App;
