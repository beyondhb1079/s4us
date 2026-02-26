import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  LinearProgress,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import Footer from './components/layout/Footer';
import Home from './pages/PublicHome';
import Header, { HeaderSkeleton } from './components/layout/Header';
import theme from './theme';
import FirebaseProvider from './lib/FirebaseProvider';
import ProtectedRoute from './components/layout/ProtectedRoute';
import { AuthProvider } from './lib/useAuth';
import ScrollToTop from './components/layout/ScrollToTop';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Pages should be loaded lazily on an as-needed basis
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ViewScholarship = lazy(() => import('./pages/ViewScholarship'));
const ListScholarships = lazy(() => import('./pages/ListScholarships'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const AddScholarship = lazy(() => import('./pages/AddScholarship'));
const EditScholarship = lazy(() => import('./pages/EditScholarship'));
const Suggest = lazy(() => import('./pages/Suggest'));

// This should be suspended too because of the auth dependency
const LoginDialogWrapper = lazy(
  () => import('./components/layout/LoginDialogWrapper'),
);

function App(): React.JSX.Element {
  return (
    <div className="page-container">
      <FirebaseProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <QueryClientProvider client={queryClient}>
                <Router>
                  <ScrollToTop />
                  <Header />
                  <HeaderSkeleton />
                  <Suspense fallback={<LinearProgress sx={{ m: 5 }} />}>
                    <main className="content-wrap">
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
                        <Route path="/suggest" element={<Suggest />} />
                        <Route
                          path="/dashboard"
                          element={<ProtectedRoute element={<Dashboard />} />}
                        />
                        <Route path="/" element={<Home />} />
                      </Routes>
                    </main>
                    <LoginDialogWrapper />
                    {/* Footer inside <Suspense> but outside <div> so it:
                          1. Gravitates to the bottom (see App.css) and
                          2. Doesn't appear before main content.*/}
                    <Footer />
                  </Suspense>
                </Router>
              </QueryClientProvider>
            </AuthProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </FirebaseProvider>
    </div>
  );
}

export default App;
