import Button from './Button';
import Input from './Input';
import classes from '../css-ultils/form.module.css';
import FormLayout from '../layout/FormLayout';
import Loading from './Loading';
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
      console.log(err);
      setErrors(err.response.data.error.errors);
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
        {<Loading loading={loading} error={errors} />}
        <form onSubmit={signup} className={classes.form}>
          {errors.firstName ? (
            <p className={classes.firstNameError}>{errors.firstName.message}</p>
          ) : (
            ''
          )}
          <Input
            htmlFor="firstName"
            label="First name"
            type="text"
            id="firstName"
            name="firstName"
            placeholder="first name..."
            value={firstName}
            onChange={handleChange}
          />
          {errors.lastName ? (
            <p className={classes.lastNameError}>{errors.lastName.message}</p>
          ) : (
            ''
          )}
          <Input
            htmlFor="lastName"
            label="Last name"
            type="text"
            id="lastName"
            name="lastName"
            placeholder="last name..."
            value={lastName}
            onChange={handleChange}
          />
          {errors.email ? (
            <p className={classes.emailError}>{errors.email.message}</p>
          ) : (
            ''
          )}
          <Input
            htmlFor="email"
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="email..."
            value={email}
            onChange={handleChange}
          />
          {errors.password ? (
            <p className={classes.passwordError}>{errors.password.message}</p>
          ) : (
            ''
          )}
          <Input
            htmlFor="password"
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="password..."
            value={password}
            onChange={handleChange}
          />
          {errors.passwordConfirm ? (
            <p className={classes.confirmPasswordError}>
              {errors.passwordConfirm.message}
            </p>
          ) : (
            ''
          )}
          <Input
            htmlFor="passwordConfirm"
            label="Password Confirm"
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="password confirm...."
            value={passwordConfirm}
            onChange={handleChange}
          />
          <Button type="submit" name="Signup" />
        </form>
      </FormLayout>
    </>
  );
};

export default Signup;
