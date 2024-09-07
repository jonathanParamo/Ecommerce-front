import { InputContainer } from "../utils/createProductForm";

const FormField = ({ label, type, value, onChange, options, multiple, accept, placeholder, required }) => {
  if (type === 'select') {
    return (
      <InputContainer>
        <label>{label}</label>
        <select value={value} onChange={onChange} required={required}>
          <option></option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputContainer>
    );
  }

  if (type === 'file') {
    return (
      <InputContainer>
        <label>{label}</label>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={onChange}
        />
      </InputContainer>
    );
  }

  return (
    <InputContainer>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </InputContainer>
  );
};

export default FormField;
