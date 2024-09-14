import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeSwitcher';
import SubMenu from './SubMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/auth/verify-token', {
          method: 'GET',
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
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <nav className="fixed top-0 left-0 w-full h-[72px] bg-purple-800 dark:bg-black flex items-center justify-between shadow-md z-50">
      <div className="w-full h-full dark:bg-[#f5f5f515]">
        <div className='px-2 w-full h-full flex items-center justify-between'>
          {/* Left side: SubMenu and Promotions Link */}
          <div className="flex items-center">
            <SubMenu />
            <div className="md:hidden w-32">
              <Link
                to="/promotions"
                className="w-full text-white font-roboto dark:hover:text-cyan-500 text-lg transform duration-500 ease-out text-center"
              >
                Promotions
              </Link>
            </div>
          </div>

          {/* Center: SearchBar */}
          <div className="flex-1 flex items-center justify-center">
            <SearchBar />
          </div>

          {/* Right side: Logo */}
          <div className="text-white text-xl">
            <div className="flex items-center justify-center">
              Aquí va el logo
            </div>
          </div>
        </div>
      </div>


      {/* Theme Toggle Button */}
      <div className="fixed bottom-0 right-0 m-4">
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

export default Navbar;
