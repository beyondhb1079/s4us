import React, { Component } from "react"
import "./App.css"

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from './pages/Home';

class App extends Component {
  render() {
    return (
      < Router >
        <Route exact path="/">
          <div className="App">
            <Home />
          </div>
        </Route>
      </Router>
    );
  }
}

export default App;