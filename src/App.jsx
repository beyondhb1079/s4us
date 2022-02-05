import './App.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import Footer from './components/Footer';
import Header, { HeaderSkeleton } from './components/Header';
import Home from './pages/Home';
import ViewScholarship from './pages/ViewScholarship';
import ListScholarships from './pages/ListScholarships';
import About from './pages/About';
import Contact from './pages/Contact';
import AddScholarship from './pages/AddScholarship';
import EditScholarship from './pages/EditScholarship';
import theme from './theme';
import { BRAND_NAME } from './config/constants';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LoginDialog from './components/LoginDialog';
import { AuthProvider } from './lib/useAuth';
import { ScholarshipsProvider } from './models/ScholarshipsContext';

function App() {
  return (
    <FirebaseProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Helmet
            titleTemplate={`%s | ${BRAND_NAME}`}
            defaultTitle={
              BRAND_NAME + ' | Scholarships for Undocumented Students'
            }
          />
          <AuthProvider>
            <ScholarshipsProvider>
              <Router>
                <Header />
                <HeaderSkeleton />
                <Routes>
                  <Route
                    path="/scholarships/new"
                    element={<ProtectedRoute element={<AddScholarship />} />}
                  />
                  <Route
                    path="/scholarships/:id/edit"
                    element={<ProtectedRoute element={<EditScholarship />} />}
                  />
                  <Route
                    path="/scholarships/:id"
                    element={<ViewScholarship />}
                  />
                  <Route path="/scholarships" element={<ListScholarships />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/" element={<Home />} />
                </Routes>
                <LoginDialog />
                <Footer />
              </Router>
            </ScholarshipsProvider>
          </AuthProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </FirebaseProvider>
  );
}

export default App;
