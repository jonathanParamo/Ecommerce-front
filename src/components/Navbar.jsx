import { useState } from 'react';
import { navLinks } from '../constants';
import { NavbarContainer, NavList, NavItem, NavLink, Hamburger, Logo } from '../utils/navbar';
import ThemeSwitcher from './ThemeSwitcher';
import { FaTimes, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo>My Logo</Logo>
      <Hamburger onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </Hamburger>
      <NavList $isOpen={isOpen}>
        {navLinks.map((link, index) => (
          <NavItem key={index}>
            <NavLink to={link.path}>{link.label}</NavLink>
          </NavItem>
        ))}
        <NavItem>
          <ThemeSwitcher />
        </NavItem>
      </NavList>
    </NavbarContainer>
  );
};

export default Navbar;
