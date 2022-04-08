import { useContext } from 'react';
import DashboardContainer from '../layout/DashboardContainer';
import { Link } from 'react-router-dom';
import { AuthContext } from '../store/auth-context';
import { Route } from 'react-router-dom';
import UpdatePassword from '../users/UpdatePassword';
import UpdateProfile from '../users/UpdateProfile';
import PurchaseHistory from '../users/PurchaseHistory';

const WholeSaleDashboard = () => {
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
      <div className="dashboard-links">
        <li className="dashboard-item">
          {' '}
          <Link
            className="dashboard-link"
            to="/wholesale-dashboard/update-profile"
          >
            Update Profile
          </Link>
        </li>
        <li className="dashboard-item">
          <Link
            className="dashboard-link"
            to="/wholesale-dashboard/update-password"
          >
            Update Password
          </Link>
        </li>
        <li className="dashboard-item">
          {' '}
          <Link className="dashboard-link" to="/cart">
            Cart
          </Link>
        </li>
        <li className="dashboard-item">
          {' '}
          <Link
            className="dashboard-link"
            to="/wholesale-dashboard/order-history"
          >
            Order History
          </Link>
        </li>
      </div>
    );
  };

  const userInfo = () => {
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
        {userLinks()}
        {userInfo()}
      </div>
      <div className="dashboard-right">
        <Route path="/wholesale-dashboard/:update-password">
          <UpdatePassword />
        </Route>
        <Route path="/wholesale-dashboard/:update-profile">
          <UpdateProfile />
        </Route>
        <Route path="/wholesale-dashboard/:order-history">
          <PurchaseHistory />
        </Route>
      </div>
    </DashboardContainer>
  );
};

export default WholeSaleDashboard;
