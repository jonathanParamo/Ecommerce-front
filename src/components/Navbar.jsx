import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeSwitcher';
import SubMenu from './SubMenu';

const Navbar = () => {

  return (
    <nav className="w-full bg-purple-800 dark:bg-[#000000] flex flex-col items-center text-black dark:text-white">
      <div className="px-4 py-4 w-full flex justify-between lg:px-5 items-center dark:bg-[#333333]">
        <div className="md:hidden w-2/3 flex justify-around items-center">
          <div className="flex justify-center items-center rounded text-white hover:bg-purple-700
            border border-transparent dark:hover:border-cyan-400 rounde rounded-full dark:hover:bg-transparent
            dark:hover:text-cyan-400  p-1 hover:cursor-pointer transform duration-500 ease-out"
          >
          </div>
        <SubMenu />
        </div>

        <Link href="/promotions" className="hidden md:block text-white font-roboto dark:text-cyan-300 dark:hover:text-cyan-500 text-lg transform duration-500 ease-out">
          Promotions
        </Link>

        <div className="text-white text-xl font-bold flex">
          <div className="hidden md:block ">
            aqui va algo
          </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 m-4">
        <div className="flex flex-col space-y-3">
          <ThemeToggleButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
