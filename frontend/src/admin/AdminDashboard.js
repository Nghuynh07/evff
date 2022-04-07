import { useContext } from 'react';
import DashboardContainer from '../layout/DashboardContainer';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { Route } from 'react-router-dom';
import Orders from './Orders';
import NewProduct from '../products/NewProduct';
import ViewProducts from './ViewProducts';
import UpdatePassword from '../users/UpdatePassword';
import UpdateProfile from '../users/UpdateProfile';
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
      <ul className="dashboard-links">
        <li className="dashboard-item">
          <Link className="dashboard-link" to="/admin-dashboard/update-profile">
            Update Profile
          </Link>
        </li>
        <li className="dashboard-item">
          <Link
            className="dashboard-link"
            to="/admin-dashboard/update-password"
          >
            Update Password
          </Link>
        </li>
        <li className="dashboard-item">
          <Link className="dashboard-link" to="/admin-dashboard/new-product">
            Add Product
          </Link>
        </li>
        <li className="dashboard-item">
          <Link className="dashboard-link" to="/admin-dashboard/view-products">
            View Products
          </Link>
        </li>
        <li className="dashboard-item">
          <Link className="dashboard-link" to="/admin-dashboard/view-orders">
            View Orders
          </Link>
        </li>
      </ul>
    );
  };

  const adminInfo = () => {
    return (
      <div className="dashboard-info">
        <h3 className="dashboard-info__role">
          {/* {role.charAt(0).toUpperCase() + role.slice(1)} Information */}
          Welcome Back
        </h3>
        <p>
          {firstName} {lastName}
        </p>
        <p className="dashboard-info__list--item">{email}</p>
      </div>
    );
  };

  return (
    <DashboardContainer>
      <div className="dashboard-left">
        {adminLinks()}
        {adminInfo()}
      </div>
      <div className="dashboard-right">
        <Route path="/admin-dashboard/:view-orders">
          <Orders />
        </Route>
        <Route path="/admin-dashboard/:new-product">
          <NewProduct />
        </Route>
        <Route path="/admin-dashboard/:view-products">
          <ViewProducts />
        </Route>
        <Route path="/admin-dashboard/:update-password">
          <UpdatePassword />
        </Route>
        <Route path="/admin-dashboard/:update-profile">
          <UpdateProfile />
        </Route>
      </div>
    </DashboardContainer>
  );
};

export default AdminDashboard;
