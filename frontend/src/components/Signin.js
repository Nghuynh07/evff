import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { Redirect, useHistory } from 'react-router-dom';
import Loading from './Loading';

const Signin = () => {
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/users/login', {
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
      <div className="form-wrapper flex-center">
        <div className="login hidden flex-center">
          <button onClick={() => history.push('/signup')} className="new-user">
            Sign Up
          </button>
          <h2 className="form-heading">Login</h2>
          <form onSubmit={loginSubmitHandler} className="login-form">
            <div className="error-wrapper">
              {error && <p className="login-error">{error}</p>}
            </div>
            <input
              name="email"
              type="email"
              onChange={emailOnChange}
              value={email}
              className="login-form-input"
              placeholder="Your Email"
              autoComplete="off"
            />
            <input
              name="password"
              type="password"
              onChange={passwordOnChange}
              value={password}
              className="login-form-input"
              placeholder="Your Password"
              autoComplete="off"
            />

            <button type="submit" className="form-signin-btn">
              Signin
            </button>
          </form>
        </div>
        {/* <Signup /> */}
      </div>
    );
  };

  return (
    <>
      {loadScreen()}
      {redirectUser()}
      {showForm()}
    </>
  );
};

export default Signin;
