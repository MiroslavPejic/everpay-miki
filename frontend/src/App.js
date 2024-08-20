import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage'; // Import the SignUpPage component
import ClientList from './pages/ClientList';
import PaymentList from './pages/PaymentList';
import PaymentForm from './pages/PaymentForm';
import ClientForm from './pages/ClientForm';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} /> {/* Add the SignUpPage route */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <ProtectedRoute>
                <ClientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/new"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clients/edit/:id"
            element={
              <ProtectedRoute>
                <ClientForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute>
                <PaymentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments/new"
            element={
              <ProtectedRoute>
                <PaymentForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
