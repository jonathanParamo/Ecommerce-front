const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-0" />
        <div className="w-4 h-4 bg-red-500 rounded-full animate-bounce delay-100" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
