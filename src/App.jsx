import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import React from 'react';
import FirebaseConfig from './config/FirebaseConfig';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import ScholarshipDetailsPage from './pages/ScholarshipDetailsPage';
import ScholarshipListPage from './pages/ScholarshipListPage';

function App() {
  firebase.initializeApp(FirebaseConfig);
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/scholarships/:id" component={ScholarshipDetailsPage} />
        <Route path="/scholarships" component={ScholarshipListPage} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
