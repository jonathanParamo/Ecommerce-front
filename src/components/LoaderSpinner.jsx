const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center"
      style={{ height: 'calc(100vh - 72px)' }}
    >
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200 duration-150" />
        <div className="w-4 h-4 bg-red-500 rounded-full delay-100" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-200" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
