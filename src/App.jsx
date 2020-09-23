import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

import Profile from './pages/Profile';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Scholarships from './pages/Scholarships';
import About from './pages/About';
import Contact from './pages/Contact';

import Header from './components/Global/Header/Header';
import Footer from './components/Global/Footer/Footer';
import SideNav from './components/Global/SideNav/SideNav';

function App() {
  return (
    <Router>
      <Header />
      <SideNav />
      <main>
      <Switch>
        <Route exact path="/profile" component={Profile} />
        <Route path="/scholarships/:id" component={ScholarshipDetails} />
        <Route path="/scholarships" component={Scholarships} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
      </main>
     <Footer />
    </Router>
  );
}

export default App;
