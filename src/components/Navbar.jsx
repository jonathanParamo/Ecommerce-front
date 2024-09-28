import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeSwitcher';
import SubMenu from './SubMenu';
import SearchBar from './SearchBar';
import { AiOutlineLogout  } from 'react-icons/ai';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_URL_SERVER || 'http://localhost:4000/api/v1/'

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(`${API_URL}auth/verify-token`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.valid);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error('Error verifying token:', error);
      }
    };

    checkAuthentication();
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}auth/login-admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-purple-800 dark:bg-black flex items-center justify-between shadow-md z-50">
      <div className="w-full h-full dark:bg-[#f5f5f515]">
        <div className='px-2 w-full h-full flex items-center justify-between'>
          <div className="flex items-center">
            <SubMenu />
          </div>

          <div className="hidden w-3/5 md:flex items-center justify-center">
            <SearchBar />
          </div>

          <div className="text-white text-xl flex gap gap-2">
            <div className="flex items-center justify-center font-roboto">
              Jade admin
            </div>
            {isAuthenticated && (
               <button
               onClick={handleLogout}
               className="flex items-center gap-2 text-white font-roboto font-black hover:text-purple-300 dark:hover:text-cyan-500 transition duration-300 ease-in-out p-2"
             >
               <AiOutlineLogout  className="text-3xl font-black hover:shadow-lg iaver:scale-110 transition-transform duration-300 ease-in-out" />
             </button>
            )}
          </div>

          <div className="md:hidden flex items-center justify-center">
            <SearchBar />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 m-4">
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
