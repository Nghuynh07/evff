import FormLayout from '../layout/FormLayout';
import { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { useEffect } from 'react';

const URL = '/api/v1/users/signup';
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
      if (err) {
        setLoading(false);
        setErrors(err.response.data.error.errors);
      }
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
      <form onSubmit={signup} className="form">
        <div className="input">
          <div>
            <label htmlFor="firstName" id="firstName" className="input-label">
              First name
            </label>
            <span className="error">
              {errors.firstName && <span>{errors.firstName.message}</span>}
            </span>
          </div>
          <input
            name="firstName"
            type="text"
            onChange={firstNameOnChange}
            value={firstName}
            className="input-input"
          />
        </div>

        <div className="input">
          <div>
            <label htmlFor="lastName" id="lastName" className="input-label">
              Last name
            </label>
            <span className="error">
              {errors.lastName && <span>{errors.lastName.message}</span>}
            </span>
          </div>
          <input
            name="lastName"
            type="text"
            onChange={lastNameOnChange}
            value={lastName}
            className="input-input"
          />
        </div>

        <div className="input">
          <div>
            <label htmlFor="email" id="email" className="input-label">
              Email
            </label>
            <span className="error">
              {errors.email && <span>{errors.email.message}</span>}
            </span>
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
            <span className="error">
              {errors.password && <span>{errors.password.message}</span>}
            </span>
          </div>
          <input
            name="password"
            type="password"
            onChange={passwordOnChange}
            value={password}
            className="input-input"
          />
        </div>

        <div className="input">
          <div>
            <label
              htmlFor="passwordConfirm"
              id="passwordConfirm"
              className="input-label"
            >
              Confirm Password
            </label>
            <span className="error">
              {errors.passwordConfirm && (
                <span>{errors.passwordConfirm.message}</span>
              )}
            </span>
          </div>
          <input
            name="passwordConfirm"
            className="input-input"
            type="password"
            onChange={passwordConfirmOnChange}
            value={passwordConfirm}
          />
        </div>
        <button type="submit" className="signup-button">
          Signup
        </button>
      </form>
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
