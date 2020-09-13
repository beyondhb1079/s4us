import React, {} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

function App() {
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
