import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/HomePage.js';
import ScholarshipListPage from './pages/ScholarshipListPage';
import ScholarshipDetailsPage from './pages/ScholarshipDetailsPage';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/scholarships" exact component={ScholarshipListPage} />
        <Route path="/scholarships/:id" component={ScholarshipDetailsPage} />
      </Switch>

    </Router>
  );
}

export default App;
