import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { Redirect, Link } from 'react-router-dom';
import FormLayout from '../layout/FormLayout';
import Loading from './Loading';

const Signin = () => {
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/users/login', {
        email,
        password,
      });
      setLoading(true);
      setTimeout(() => {
        login(res, () => {
          setLoading(false);
        });
        setRedirectToDashBoard(true);
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  };

  const redirectUser = () => {
    if (redirectToDashboard) {
      if (
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'admin'
      ) {
        return <Redirect to="/admin-dashboard" />;
      } else if (
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'wholesale'
      ) {
        return <Redirect to="/wholesale-dashboard" />;
      } else {
        return <Redirect to="/users-dashboard" />;
      }
    }
  };

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Please wait..." />}
      </div>
    );
  };

  const showForm = () => {
    return (
      <form onSubmit={loginSubmitHandler} className="form">
        <div className="input">
          <div>
            <label htmlFor="email" id="email" className="input-label">
              Email
            </label>
            <span className="error">{error && <span>{error}</span>}</span>
          </div>
          <input
            name="email"
            type="email"
            onChange={emailOnChange}
            value={email}
            className="input-input"
          />
        </div>

        <div className="input">
          <div>
            <label htmlFor="password" id="password" className="input-label">
              Password
            </label>
            <span className="error"></span>
          </div>
          <input
            name="password"
            type="password"
            onChange={passwordOnChange}
            value={password}
            className="input-input"
          />
        </div>
        <div className="signup-action-container">
          <button type="submit" className="signin-button">
            Signin
          </button>
          <Link to="/signup" className="signup-link">
            New user?
          </Link>
        </div>
      </form>
    );
  };

  return (
    <FormLayout>
      {loadScreen()}
      {redirectUser()}
      {showForm()}
    </FormLayout>
  );
};

export default Signin;
