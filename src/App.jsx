import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ScholarshipListPage from './pages/ScholarshipList';
import ScholarshipDetailsPage from './pages/ScholarshipDetails';
import Profile from './pages/Profile';

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
        <Route path="/scholarships/:id" component={ScholarshipDetailsPage} />
        <Route path="/scholarships" component={ScholarshipListPage} />
        <Route path="/" component={Home} />
      </Switch>
      </main>
     <Footer />
    </Router>
  );
}

export default App;
