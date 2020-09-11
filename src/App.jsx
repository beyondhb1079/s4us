import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/HomePage';
import ScholarshipListPage from './pages/ScholarshipListPage';
import ScholarshipDetailsPage from './pages/ScholarshipDetailsPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/scholarships/:id" component={ScholarshipDetailsPage} />
        <Route path="/scholarships" component={ScholarshipListPage} />
        <Route path="/" component={Home} />
      </Switch>

    </Router>
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
  ); 
}

export default App;
