import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../store/auth-context";
import axios from "axios";
import { Redirect } from "react-router-dom";

const useUser = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    firstName: "kiet",
    lastName: "nguyen",
    email: "kn@gmail.com",
    password: "123456789",
    passwordConfirm: "123456789",
    success: false,
    photo: "",
    formData: "",
  });

  console.log(authContext);

  const redirectUser = useCallback(() => {
    if (redirect) {
      if (
        authContext.isAuthenticated() &&
        authContext.isAuthenticated().data.data.user.role === "admin"
      ) {
        return <Redirect to='/admin-dashboard' />;
      } else {
        return <Redirect to='/users-dashboard' />;
      }
    }
  }, [redirect, authContext]);

  const handleChange = (event) => {
    let newUser = { ...values };
    if (event.target.name === "photo") {
      newUser[event.target.files[0]] = event.target.value;
    }

    newUser[event.target.name] = event.target.value;
    setValues(newUser);
  };
  const signup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const data = await axios.post(
        "http://localhost:4000/api/v1/users/signup",
        values
      );
      authContext.login(data, () => {
        setValues({
          ...values,
          success: true,
          redirect: true,
        });
      });
      setRedirect(true);
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      setLoading(true);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.error.errors);
    }
  };

  return {
    signup,
    handleChange,
    values,
    errors,
    loading,
    redirect,
    redirectUser,
  };
};

export default useUser;
