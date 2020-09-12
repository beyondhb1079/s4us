import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
  );
}

export default App;
