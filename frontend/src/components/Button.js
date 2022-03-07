import classes from './Button.module.css';
const Button = ({ type, name, onClick = null }) => {
  return (
    <button className={classes.button} onClick={onClick} type={type}>
      {name}
      <span></span>
    </button>
  );
};

export default Button;
