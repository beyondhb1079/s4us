import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Scholarships from './pages/Scholarships';
import About from './pages/About';
import Contact from './pages/Contact';

export default function Routes() {
  return (
    <Switch>
      <Route path="/scholarships/:id" component={ScholarshipDetails} />
      <Route path="/scholarships" component={Scholarships} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/" component={Home} />
    </Switch>
  );
}
