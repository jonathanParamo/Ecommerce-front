const FormField = ({ label, type, value, onChange, options, multiple, accept, placeholder, required }) => {
  if (type === 'select') {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="border border-gray-300 rounded-lg p-2 w-full text-gray-700"
        >
          <option value="" disabled>Select an option</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'file') {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={onChange}
          className="border border-gray-300 rounded-lg p-2 w-full text-gray-700"
        />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="border border-gray-300 rounded-lg p-2 w-full text-gray-700"
      />
    </div>
  );
};

export default FormField;
