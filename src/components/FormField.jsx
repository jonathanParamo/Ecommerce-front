const FormField = ({ label, type, value, onChange, options, multiple, accept, placeholder, required }) => {
  if (type === 'select') {
    return (
      <div className="w-full md:w-2/5">
        <label className="block font-bold mb-2 dark:text-gray-200">{label}</label>
        <select
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-3 py-2 border border-black dark:bg-[#141414] dark:border-gray-600 rounded-md bg-white dark:bg-[#141414] dark:text-white focus:outline-none"
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
      <div className="w-full md:w-2/5">
        <label className="block font-bold mb-2 dark:text-gray-200">{label}</label>
        <input
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={onChange}
          className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
        />
      </div>
    );
  }

  return (
    <div className="w-full md:w-2/5">
      <label className="block font-bold mb-2 dark:text-gray-200">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-black dark:border-gray-600 rounded-md bg-white dark:bg-transparent dark:text-white focus:outline-none"
      />
    </div>
  );
};

export default FormField;
