import React, { Component } from "react"
import "./App.css"
import Header from './components/Header';
import Footer from './components/Footer';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      < Router >
        <Header />
        <Route>
          <Home />
        </Route>
        <Footer />
      </Router>
    );
  }
}

export default App;