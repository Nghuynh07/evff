import { useContext, useState, useEffect } from "react";
import DashboardContainer from "../layout/DashboardContainer";
import { Link } from "react-router-dom";
import classes from "../admin/AdminDashboard.module.css";
import { AuthContext } from "../store/auth-context";
import { Route } from "react-router-dom";
import UpdatePassword from "../users/UpdatePassword";
import UpdateProfile from "../users/UpdateProfile";
import PurchaseHistory from "./PurchaseHistory";

const UserDashboard = () => {
  const auth = useContext(AuthContext);
  const {
    data: {
      data: {
        user: { firstName, lastName, email, role },
      },
    },
  } = auth.isAuthenticated();

  const userLinks = () => {
    return (
      <ul className={classes.adminDashboard}>
        <li>
          <Link className={classes.link} to='/users-dashboard/update-profile'>
            Update Profile
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/users-dashboard/update-password'>
            Update Password
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/cart'>
            Cart
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/users-dashboard/order-history'>
            Order History
          </Link>
        </li>
      </ul>
    );
  };

  const userInfo = () => {
    return (
      <div className={classes.adminInfo}>
        <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Information</h3>
        <ul>
          <li>First Name: {firstName}</li>
          <li>Last Name: {lastName}</li>
          <li>Email: {email}</li>
          <li>Role: {role}</li>
        </ul>
      </div>
    );
  };

  return (
    <DashboardContainer>
      {userLinks()}
      {userInfo()}
      <Route path='/users-dashboard/:update-password'>
        <UpdatePassword />
      </Route>
      <Route path='/users-dashboard/:update-profile'>
        <UpdateProfile />
      </Route>
      <Route path='/users-dashboard/:order-history'>
        <PurchaseHistory />
      </Route>
    </DashboardContainer>
  );
};

export default UserDashboard;
