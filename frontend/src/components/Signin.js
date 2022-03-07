import React, { useState, useContext } from 'react';
import '../sass/main.scss';
import Input from './Input';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
import { Link, Redirect } from 'react-router-dom';
import classes from '../css-ultils/form.module.css';
import FormLayout from '../layout/FormLayout';
import Loading from './Loading';

const URL = 'http://localhost:4000/api/v1/users/login';

const Signin = () => {
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);

  const authContext = useContext(AuthContext);

  const [data, setData] = useState({
    email: '',
    password: '',
    loading: false,
    success: false,
    error: '',
  });

  const { email, password, loading, error, success } = data;

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
      {success && <p>Logging in...</p>}
      <Loading loading={loading} error={error} />
      <form className="form" onSubmit={loginSubmitHandler}>
        <Input
          errorClass={classes.error}
          error={error}
          errorMessage={error}
          htmlFor="email"
          label="Email"
          type="email"
          id="email"
          name="email"
          placeholder="email..."
          value={email}
          onChange={inputHandler}
        />
        <Input
          htmlFor="password"
          label="Password"
          type="password"
          id="password"
          name="password"
          placeholder="password..."
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
