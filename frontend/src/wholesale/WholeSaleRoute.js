import React from "react";
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store/auth-context";

const WholeSaleRoute = ({ component: UserComponent }) => {
  const auth = useContext(AuthContext);

  return (
    <Route>
      {auth.isAuthenticated() &&
      auth.isAuthenticated().data.data.user.role === "wholesale" ? (
        <UserComponent />
      ) : (
        <Redirect to='/login' />
      )}
    </Route>
  );
};

export default WholeSaleRoute;
