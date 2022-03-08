import Input from './Input';
import FormLayout from '../layout/FormLayout';
import { useState, useContext } from 'react';
import { AuthContext } from '../store/auth-context';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const URL = 'http://localhost:4000/api/v1/users/signup';
const Signup = () => {
  const authContext = useContext(AuthContext);
  const [redirectToDashboard, setRedirectToDashBoard] = useState(false);
  const [errors, setErrors] = useState('');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    success: false,
    loading: false,
    photo: '',
    formData: '',
  });

  const { firstName, lastName, email, password, passwordConfirm, loading } =
    data;

  const handleChange = (event) => {
    let newUser = { ...data };
    if (event.target.name === 'photo') {
      newUser[event.target.files[0]] = event.target.value;
    }

    newUser[event.target.name] = event.target.value;
    setData(newUser);
  };

  const signup = async (event) => {
    event.preventDefault();

    if (password.length < 8 && passwordConfirm.length < 8) {
      setErrors('At least character is required');
    }

    setData({ ...data, loading: true });
    try {
      const res = await axios.post(URL, data);
      authContext.login(res, () => {
        setData({
          ...data,
          success: true,
          redirect: true,
          loading: false,
        });
      });
      setRedirectToDashBoard(true);
      setData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
      });
    } catch (err) {
      if (err) {
        setErrors('Please fill out all fields');
      }
    }
  };

  const redirectUser = () => {
    if (redirectToDashboard) {
      if (
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === 'admin'
      ) {
        return <Redirect to="/admin-dashboard" />;
      } else {
        return <Redirect to="/users-dashboard" />;
      }
    }
  };

  return (
    <>
      {redirectUser()}
      <FormLayout>
        <form onSubmit={signup} className="form">
          {errors && <p className="error-signup">{errors}</p>}
          <Input
            htmlFor="firstName"
            label="First name"
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
          />
          <Input
            htmlFor="lastName"
            label="Last name"
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
          />
          <Input
            htmlFor="email"
            label="Email"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <Input
            htmlFor="password"
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <Input
            htmlFor="passwordConfirm"
            label="Password Confirm"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handleChange}
          />
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
      </FormLayout>
    </>
  );
};

export default Signup;
