import { useContext } from "react";
import DashboardContainer from "../layout/DashboardContainer";
import { Link } from "react-router-dom";
import classes from "./AdminDashboard.module.css";
import { AuthContext } from "../store/auth-context";
import { Route } from "react-router-dom";
import Orders from "./Orders";
import NewProduct from "../products/NewProduct";
import ViewProducts from "./ViewProducts";
import UpdatePassword from "../users/UpdatePassword";
import UpdateProfile from "../users/UpdateProfile";
const AdminDashboard = () => {
  const auth = useContext(AuthContext);
  const {
    data: {
      data: {
        user: { firstName, lastName, email, role },
      },
    },
  } = auth.isAuthenticated();

  const adminLinks = () => {
    return (
      <ul className={classes.adminDashboard}>
        <li>
          <Link className={classes.link} to='/admin-dashboard/update-profile'>
            Update Profile
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/admin-dashboard/update-password'>
            Update Password
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/admin-dashboard/new-product'>
            Add Product
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/admin-dashboard/view-products'>
            View Products
          </Link>
        </li>
        <li>
          <Link className={classes.link} to='/admin-dashboard/view-orders'>
            View Orders
          </Link>
        </li>
      </ul>
    );
  };

  const adminInfo = () => {
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
      {adminLinks()}
      {adminInfo()}
      <Route path='/admin-dashboard/:view-orders'>
        <Orders />
      </Route>
      <Route path='/admin-dashboard/:new-product'>
        <NewProduct />
      </Route>
      <Route path='/admin-dashboard/:view-products'>
        <ViewProducts />
      </Route>
      <Route path='/admin-dashboard/:update-password'>
        <UpdatePassword />
      </Route>
      <Route path='/admin-dashboard/:update-profile'>
        <UpdateProfile />
      </Route>
    </DashboardContainer>
  );
};

export default AdminDashboard;
