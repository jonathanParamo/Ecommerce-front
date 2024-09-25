import { BsExclamationTriangle } from 'react-icons/bs';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex flex-col items-center h-full bg-gray-100 dark:bg-black">
      <div className="flex items-center space-x-2 mt-12 p-4 bg-red-800 dark:bg-red-950 text-red-50
        dark:text-red-50 rounded-lg">
        <BsExclamationTriangle className="w-6 h-6 text-yellow-100 dark:text-red-400" />
        <span>{message || 'Something went wrong. Please try again later.'}</span>
      </div>
      <div className="flex justify-center items-center h-3/5 bg-gray-100 dark:bg-black">
      <div className="text-center">
        <div className="relative flex justify-center items-center">
          <div className="w-20 h-20 bg-red-950 dark:bg-cyan-600 rounded-lg"></div>

          <div className="absolute top-[-40px] w-12 h-12 bg-red-950 dark:bg-cyan-600 rounded-full flex justify-center items-center">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-50 dark:bg-white rounded-full text-white font-bold">Y</div>
              <div className="w-3 h-3 bg-red-50 dark:bg-white rounded-full text-white font-bold">Y</div>
            </div>
          </div>

          <div className="absolute top-[20px] left-[124px] w-8 h-2 bg-red-900 dark:bg-cyan-800"></div>
          <div className="absolute top-[110px] left-[150px] w-8 h-2 bg-red-900 dark:bg-cyan-800"></div>

          <div className="absolute top-[20px] right-[124px] w-8 h-2 bg-red-900 dark:bg-cyan-800"></div>
          <div className="absolute top-[110px] right-[150px] w-8 h-2 bg-red-900 dark:bg-cyan-800"></div>

          <div className="absolute top-[80px] left-[170px] w-2 h-8 bg-red-900 dark:bg-cyan-800"></div>
          <div className="absolute top-[20px] left-[120px] w-2 h-8 bg-red-900 dark:bg-cyan-800"></div>

          <div className="absolute top-[80px] right-[170px] w-2 h-8 bg-red-900 dark:bg-cyan-800"></div>
          <div className="absolute top-[20px] right-[120px] w-2 h-8 bg-red-900 dark:bg-cyan-800"></div>

        </div>

        <p className="mt-10 text-red-900 dark:text-red-300 text-lg font-semibold">
          Oops! Something went wrong...
        </p>
        <p className="mt-2 text-red-900 dark:text-red-400">
          Our robot friend is trying to fix it. Please try again later.
        </p>
      </div>
    </div>
    </div>
  );
};

export default ErrorMessage;
