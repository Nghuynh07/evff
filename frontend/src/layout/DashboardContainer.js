import classes from "./DashboardContainer.module.css";

const DashboardContainer = ({ children }) => {
  return <div className={classes.dashboardContainer}>{children}</div>;
};

export default DashboardContainer;
