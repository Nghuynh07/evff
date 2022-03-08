import React, { useState, useContext } from 'react';
import Input from './Input';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { Link, Redirect } from 'react-router-dom';
import FormLayout from '../layout/FormLayout';

const URL = 'http://localhost:4000/api/v1/users/login';

const Signin = () => {
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);
  const authContext = useContext(AuthContext);
  const [data, setData] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    success: false,
  });

  const { email, password, error, loading, success } = data;

  const inputHandler = (e) => {
    const inputData = { ...data };
    inputData[e.target.name] = e.target.value;
    setData(inputData);
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setData({ ...data, loading: true, success: false });
    try {
      const res = await axios.post(URL, { email, password });

      authContext.login(res, () => {
        setData({
          ...data,
          email: '',
          password: '',
          loading: false,
          success: true,
        });
      });

      setRedirectToDashBoard(true);
    } catch (err) {
      // console.log(err.response.data.message);
      setData({
        ...data,
        loading: false,
        success: false,
        error: err.response.data.message,
      });
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

  return (
    <FormLayout>
      {redirectUser()}
      <form className="form" onSubmit={loginSubmitHandler}>
        {error && <p className="error-signin">{error}</p>}
        <Input
          htmlFor="email"
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={inputHandler}
        />
        <Input
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={inputHandler}
        />
        <div className="signup-action-container">
          <button
            className="signin-button"
            type="submit"
            onClick={authContext.logout}
          >
            Login
          </button>
          <Link className="signup-link" to="/signup">
            New User?
          </Link>
        </div>
      </form>
    </FormLayout>
  );
};

export default Signin;
