import { useTheme } from './ThemeProvider';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 md:w-20 h-10 md:h-12 rounded-full p-1 flex items-center transition-all duration-500 focus:outline-none
        bg-gradient-to-r from-blue-950 via-blue-800 to-blue-500 dark:from-blue-950 dark:via-blue-800 dark:to-blue-500"
    >
    {/* Icono de la luna */}
    <BsFillMoonStarsFill
      className={`absolute left-2 w-6 h-6 md:w-8 md:h-8 text-yellow-400 ${theme === false ? 'block' : 'hidden'}`}
    />

    {/* Icono del sol */}
    <BsFillSunFill
      className={`absolute right-1 w-6 h-6 md:w-8 md:h-8 text-yellow-400 ${theme === false ? 'hidden' : 'block'}`}
    />

    {/* Botón de deslizamiento */}
    <span
      className={`${
        theme === false ? 'translate-x-6 md:translate-x-11' : 'translate-x-1.5'
      } inline-block w-6 h-6 bg-gray-400 dark:bg-gray-400 rounded-full shadow-md transform transition-transform duration-500`}
    ></span>
  </button>
  );
};

export default ThemeToggleButton;
