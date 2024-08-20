import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import your configured Supabase client

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    // You can return a loading indicator while the session is being checked
    return <div>Loading...</div>;
  }

  if (!session) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If the user is logged in, render the child components
  return children;
};

export default ProtectedRoute;
