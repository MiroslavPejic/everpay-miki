import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ClientList from './pages/ClientList';
import PaymentList from './pages/PaymentList';
import PaymentForm from './pages/PaymentForm';
import ClientForm from './pages/ClientForm';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/new" element={<ClientForm />} /> {/* Adjust path if needed */}
        <Route path="/clients/edit/:id" element={<ClientForm />} /> {/* Adjust path if needed */}
        <Route path="/payments" element={<PaymentList />} />
        <Route path="/payments/new" element={<PaymentForm />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
