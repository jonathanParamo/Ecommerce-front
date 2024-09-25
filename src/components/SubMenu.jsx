'use client'

import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { FaTimes, FaBars } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa6';
import { navLinks } from '../constants';

function SubMenu() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const menuRef = useRef(null);

  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  const handleMouseEnter = (label) => {
    setOpenCategory(label);
  };

  const handleMouseLeave = () => {
    setOpenCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-end ${isSubMenuOpen ? 'bg-purple-800 dark:bg-transparent' : 'bg-transparent'}
      p-2 transition-all duration-500 ease-out`}
      ref={menuRef}
    >
      <button
        onClick={handleSubMenuToggle}
        className="flex items-center justify-center text-white font-bold rounded transition-all
        duration-500 ease-out"
      >
        {isSubMenuOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
      </button>

      <div
        className={`fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-purple-800 dark:bg-black transition-transform duration-1000 ease-out ${isSubMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {isSubMenuOpen && (
          <ul className="bg-purple-800 dark:bg-[#f5f5f515] px-4 shadow-lg h-full">
            {navLinks.map((link) => (
              <li
                key={link.path || link.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.subcategories ? (
                  // Mostrar el botón con subcategorías si existen
                  <>
                    <button
                      className="text-white hover:text-pink-500 dark:hover:text-cyan-500 font-semibold flex items-center justify-between w-full p-2 rounded transition-all duration-500 ease-out"
                      onClick={() => handleMouseEnter(link.label)} // Asegúrate de manejar clics en categorías con subcategorías
                    >
                      {link.label}
                      <FaChevronRight className="ml-2" />
                    </button>
                    {openCategory === link.label && (
                      <ul className="absolute left-full top-0 w-48 bg-purple-800 dark:bg-[#141414] pl-4 p-2 rounded-r shadow-lg-r space-y-1">
                        {link.subcategories.map((subLink) => (
                          <li key={subLink.path}>
                            <Link
                              to={subLink.path}
                              className="block p-2 text-white hover:text-pink-500 border-b-2 border-[#f5f5f550] hover:border-pink-500 dark:hover:border-cyan-400 dark:hover:text-cyan-500 transition-all duration-500 ease-out"
                              onClick={() => {
                                handleSubMenuToggle();
                                handleMouseLeave();
                              }}
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  // Si no hay subcategorías, el botón actúa como un enlace
                  <Link
                    to={link.path}
                    className="text-white hover:text-pink-500 dark:hover:text-cyan-500 font-semibold flex items-center justify-between w-full p-2 rounded transition-all duration-500 ease-out"
                    onClick={() => handleSubMenuToggle()}
                  >
                    {link.label}
                    <FaChevronRight className="ml-2" />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default SubMenu;
