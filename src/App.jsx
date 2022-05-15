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
import Header, { HeaderSkeleton } from './components/Header';
import theme from './theme';
import { BRAND_NAME } from './config/constants';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './lib/useAuth';
// TODO: Fix this. This slows EVERYTHING down. 1.03->1.34 DOM load + 1.9->2.24 load
// Maybe use nested routes? Perhaps only for /scholarships path?
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
const UserHome = lazy(() => import('./pages/UserHome'));

// Lazy load as these are not essential on initial render
// Maybe import this anyway
const Footer = lazy(() => import('./components/Footer'));

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
                  <Suspense fallback={<LinearProgress sx={{ m: 5 }} />}>
                    <div className="content-wrap">
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
                        <Route
                          path="/dashboard"
                          element={<ProtectedRoute element={<UserHome />} />}
                        />
                        <Route path="/" element={<Home />} />
                      </Routes>{' '}
                    </div>
                    {/* Footer inside <Suspense> but outside <div> so it:
                          1. Gravitates to the bottom (see App.css) and
                          2. Doesn't appear before main content.*/}
                    <Footer />
                  </Suspense>
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
