import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import FirebaseConfig from './config/FirebaseConfig';
import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes';

function App() {
  firebase.initializeApp(FirebaseConfig);

  return (
    <Router>
      <Header />
      <Routes />
      <Footer />
    </Router>
  );
}

export default App;
