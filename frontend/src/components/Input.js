import classes from './Input.module.css';

const Input = ({
  htmlFor,
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  errorClass,
  error = false,
  errorMessage,
  name,
}) => {
  return (
    <div>
      <p className={errorClass}>{error ? errorMessage : ''}</p>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        className={classes.input}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        step="0.01"
      />
    </div>
  );
};

export default Input;
