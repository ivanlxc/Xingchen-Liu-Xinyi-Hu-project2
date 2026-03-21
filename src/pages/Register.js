import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  return (
    <main className="page-container">
      <div className="auth-wrapper">
        <div className="auth-card card">
          <div className="auth-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
          </div>
          <h1 className="auth-title">Create Account</h1>
          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="reg-username">Username</label>
              <input type="text" id="reg-username" placeholder="Choose a username" />
            </div>
            <div className="form-group">
              <label htmlFor="reg-password">Password</label>
              <input type="password" id="reg-password" placeholder="Create a password" />
            </div>
            <div className="form-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <input type="password" id="reg-confirm" placeholder="Verify your password" />
            </div>
            <button type="submit" className="btn btn-primary auth-submit">Create Account</button>
          </form>
          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Register;
