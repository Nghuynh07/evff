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
      <label htmlFor={htmlFor} className="input-label">
        {label}
      </label>
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
