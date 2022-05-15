import './App.css';
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  LinearProgress,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import Footer from './components/Footer';
import Header, { HeaderSkeleton } from './components/Header';
import theme from './theme';
import { BRAND_NAME } from './config/constants';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './lib/useAuth';
import { ScholarshipsProvider } from './models/ScholarshipsContext';
import ScrollToTop from './ScrollToTop';

// Pages should be loaded lazily on an as-needed basis
const Home = lazy(() => import('./pages/Home'));
const ViewScholarship = lazy(() => import('./pages/ViewScholarship'));
const ListScholarships = lazy(() => import('./pages/ListScholarships'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AddScholarship = lazy(() => import('./pages/AddScholarship'));
const EditScholarship = lazy(() => import('./pages/EditScholarship'));

// This should be suspended too because of the auth dependency
const LoginDialog = lazy(() => import('./components/LoginDialog'));

function App() {
  return (
    <div className="page-container">
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
                  <ScrollToTop />
                  <Header />
                  <HeaderSkeleton />
                  <div className="content-wrap">
                    <Suspense fallback={<LinearProgress sx={{ m: 5 }} />}>
                      <Routes>
                        <Route
                          path="/scholarships/new"
                          element={
                            <ProtectedRoute element={<AddScholarship />} />
                          }
                        />
                        <Route
                          path="/scholarships/:id/edit"
                          element={
                            <ProtectedRoute element={<EditScholarship />} />
                          }
                        />
                        <Route
                          path="/scholarships/:id"
                          element={<ViewScholarship />}
                        />
                        <Route
                          path="/scholarships"
                          element={<ListScholarships />}
                        />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/" element={<Home />} />
                      </Routes>
                      <LoginDialog />
                    </Suspense>
                  </div>
                  <Footer />
                </Router>
              </ScholarshipsProvider>
            </AuthProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
