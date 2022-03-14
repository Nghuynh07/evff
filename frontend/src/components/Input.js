const Input = ({
  htmlFor,
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  name,
  step = null,
}) => {
  return (
    <div className="input">
      <div>
        <label htmlFor={htmlFor} className="input-label">
          {label}
        </label>
        <span className="error-signup"></span>
      </div>
      <input
        className="input-input"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        step={step}
      />
    </div>
  );
};

export default Input;
