import { useTheme } from './ThemeProvider';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 md:w-20 h-10 md:w-[72px] md:h-12 bg-gray-700 rounded-full p-1 flex items-center transition-all duration-500 focus:outline-none"
    >
      <BsFillMoonStarsFill className={`absolute left-0 w-6 h-6 md:w-8 md:h-8 pl-1 text-yellow-500 ${theme === 'dark' ? 'block' : 'hidden'}`} />
      <span
        className={`${
          theme === 'dark' ? 'translate-x-6 md:translate-x-8' : 'translate-x-1.5'
        } inline-block w-6 h-6 bg-[#f5f5f570] dark:bg-blue-200 rounded-full shadow-md transform transition-transform duration-500 dark:mr-0`}
      ></span>
      <BsFillSunFill className={`absolute right-0 pr-1 w-6 h-6 md:w-8 md:h-8 text-yellow-500 ${theme === 'dark' ? 'hidden' : 'block'}`} />
    </button>
  );
};

export default ThemeToggleButton;
