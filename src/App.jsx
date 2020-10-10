import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import FirebaseConfig from './config/FirebaseConfig';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ScholarshipDetails from './pages/ScholarshipDetails';
import Scholarships from './pages/Scholarships';
import About from './pages/About';
import Contact from './pages/Contact';
import ScholarshipForm from './pages/ScholarshipForm';

function App() {
  firebase.initializeApp(FirebaseConfig);

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/scholarships/new" component={ScholarshipForm} />
        <Route path="/scholarships/:id" component={ScholarshipDetails} />
        <Route path="/scholarships" component={Scholarships} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
