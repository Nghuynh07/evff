import FormLayout from '../layout/FormLayout';
import { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { useEffect } from 'react';

const URL = 'http://localhost:4000/api/v1/users/signup';
const Signup = () => {
  const aCtx = useContext(AuthContext);
  const { login, isAuthenticated } = aCtx;
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);
  const [errors, setErrors] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {}, []);

  const firstNameOnChange = (e) => {
    setFirstName(e.target.value);
  };

  const lastNameOnChange = (e) => {
    setLastName(e.target.value);
  };

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };
  const passwordConfirmOnChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const signup = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(URL, {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      });
      console.log(res);
      setLoading(true);
      setTimeout(() => {
        login(res, () => {
          setSuccess(true);
          setLoading(false);
        });
      }, 1500);
      setTimeout(() => {
        setRedirectToDashBoard(true);
      }, 3000);
    } catch (err) {
      setLoading(false);
      // console.log(err.response.data.error.errors);
      const error = await err.response.data.error.errors;
      setErrors(error);
    }
  };

  const redirectUser = () => {
    if (redirectToDashboard) {
      if (
        isAuthenticated() &&
        isAuthenticated().data.data.user.role === 'admin'
      ) {
        return <Redirect to="/admin-dashboard" />;
      } else {
        return <Redirect to="/users-dashboard" />;
      }
    }
  };

  const showForm = () => {
    return (
      <div className="form-wrapper flex-center">
        <div className="signup hidden flex-center">
          <form onSubmit={signup} className="signup-form flex-center">
            <div className="error-wrapper">
              {errors.firstName && (
                <p className="signup-error">{errors.firstName.message}</p>
              )}
            </div>
            <input
              name="firstName"
              type="text"
              onChange={firstNameOnChange}
              value={firstName}
              className="signup-form-input"
              placeholder="First Name"
            />
            <div className="error-wrapper">
              {errors.lastName && (
                <p className="signup-error">{errors.lastName.message}</p>
              )}
            </div>
            <input
              name="lastName"
              type="text"
              onChange={lastNameOnChange}
              value={lastName}
              className="signup-form-input"
              placeholder="Last Name"
            />
            <div className="error-wrapper">
              {errors.email && (
                <p className="signup-error">{errors.email.message}</p>
              )}
            </div>
            <input
              name="email"
              type="email"
              onChange={emailOnChange}
              value={email}
              className="signup-form-input"
              placeholder="Email"
            />
            <div className="error-wrapper">
              {errors.password && (
                <p className="signup-error">{errors.password.message}</p>
              )}
            </div>
            <input
              name="password"
              type="password"
              onChange={passwordOnChange}
              value={password}
              className="signup-form-input"
              placeholder="Password"
            />
            <div className="error-wrapper">
              {errors.passwordConfirm && (
                <p className="signup-error">{errors.passwordConfirm.message}</p>
              )}
            </div>
            <input
              name="passwordConfirm"
              className="signup-form-input"
              type="password"
              onChange={passwordConfirmOnChange}
              value={passwordConfirm}
              placeholder="Confirm Password"
            />

            <button type="submit" className="form-signup-btn">
              Signup
            </button>
          </form>
          <h1 className="form-heading">Signup</h1>
        </div>
      </div>
    );
  };

  const loadScreen = () => {
    return (
      <div className="loading-container ">
        {loading && <Loading text="Please wait..." />}
        {success && <Loading text="Setting up your account. Please wait..." />}
      </div>
    );
  };

  return (
    <FormLayout>
      {redirectUser()}
      {loadScreen()}
      {showForm()}
    </FormLayout>
  );
};

export default Signup;
