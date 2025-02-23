import React from 'react';
import { Link } from 'react-router-dom';

const AuthButtons = () => {
  return (
    <div>
      <Link to="/login" className="btn btn-primary me-3">Login</Link>
      <Link to="/register" className="btn btn-secondary">Register</Link>
    </div>
  );
};

export default AuthButtons;
