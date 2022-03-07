const Input = ({
  htmlFor,
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  name,
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
        step="0.01"
      />
    </div>
  );
};

export default Input;
