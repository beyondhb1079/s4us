import React, {} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import firebase from 'firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import FirebaseConfig from './config/FirebaseConfig';

import Home from './pages/Home';

function App() {
  firebase.initializeApp(FirebaseConfig);
  return (
    <Router>
      <Header />
      <Route>
        <Home />
      </Route>
      <Footer />
    </Router>
  );
}

export default App;
