import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // To handle initial loading state
  // const navigate = useNavigate(); 

  useEffect(() => {
    // Check if there's a token in localStorage and validate it
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      // Make API call to log in
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { token } = response.data;

      // Store the new token in local storage
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Update the authentication state
      setIsAuthenticated(true);

      // Redirect to movies page
      <Navigate to={"/movies"} />

      alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      alert('Failed to log in');
    }
  };

  const registor = async (credentials) => {
    // debugger
    try {
      const formData = new FormData();
      formData.append("name", credentials.fullName);
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);
      formData.append("password_confirmation", credentials.confirmPassword);

      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      const { token } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setIsAuthenticated(true);

      // Redirect to movies page after successful registration
      <Navigate to={"/movies"} />

      alert('Sign up successfully!');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('Failed to sign up');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);

    // Redirect to login page after logout
    <Navigate to={"/movies"} />
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, registor, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
