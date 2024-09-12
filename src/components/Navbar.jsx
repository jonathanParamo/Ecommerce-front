import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeSwitcher';
import SubMenu from './SubMenu';
import SearchBar from './SearchBar';

const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-purple-800 dark:bg-black flex items-center justify-between shadow-md z-50">
      <div className="w-full h-[72px] flex justify-between lg:px-5 items-center dark:bg-[#f5f5f515]">
        <div className="md:hidden w-2/3 flex justify-around items-center">
          <div className="flex justify-center items-center rounded text-white hover:bg-purple-700
            border border-transparent dark:hover:border-cyan-400 rounde rounded-full dark:hover:bg-transparent
            dark:hover:text-cyan-400  p-1 hover:cursor-pointer transform duration-500 ease-out"
          >
          </div>
        </div>
        <SubMenu />
        <SearchBar />
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
