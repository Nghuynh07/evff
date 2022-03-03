import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store/auth-context";
const AdminRoute = ({ component: AdminComponent, ...otherProps }) => {
  const auth = useContext(AuthContext);

  return (
    <Route>
      {auth.isAuthenticated() &&
      auth.isAuthenticated().data.data.user.role === "admin" ? (
        <AdminComponent {...otherProps} />
      ) : (
        <Redirect to='/login' />
      )}
    </Route>
  );
};

export default AdminRoute;
