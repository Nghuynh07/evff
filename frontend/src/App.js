import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shop from './pages/Shop';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserRoute from './users/UserRoute';
import UserDashboard from './users/UserDashboard';
import AdminRoute from './admin/AdminRoute';
import AdminDashboard from './admin/AdminDashboard';
import WholeSaleRoute from './wholesale/WholeSaleRoute';
import WholeSaleDashboard from './wholesale/WholeSaleDashboard';

function App() {
  return (
    <div className="container">
      <div className="bg"></div>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <UserRoute path="/users-dashboard" component={UserDashboard} />
        <AdminRoute path="/admin-dashboard" component={AdminDashboard} />
        <WholeSaleRoute
          path="/wholesale-dashboard"
          component={WholeSaleDashboard}
        />
      </Switch>
    </div>
  );
}

export default App;
