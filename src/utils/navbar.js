import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Estilos para el contenedor del Navbar
const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.navbarBackground};
  color: ${({ theme }) => theme.navbarText};
  width: 100%; // Cambia para que el navbar ocupe el ancho completo
  height: 70px;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  padding: 5px;
  box-shadow: 2px 0 4px #8b5cf6;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 10px;
    padding-bottom: 10px;
    box-shadow: none; // Elimina la sombra en pantallas pequeñas para evitar distracciones
  }
`;

// Estilo para el Logo del Navbar
const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;

  @media (max-width: 768px) {
    margin-left: 10px;
  }
`;

// Estilo para el botón de menú tipo hamburguesa
const Hamburger = styled.div`
  display: none;
  font-size: 24px;
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Estilos para la lista de enlaces
const NavList = styled.ul`
  list-style: none;
  padding-right: 30px;
  margin: 0;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-height: ${props => (props.isOpen ? '300px' : '0')};
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    background-color: ${({ theme }) => theme.navbarBackground};
    position: absolute; // Absoluto en pantallas pequeñas
    top: 60px; // Espacio debajo del logo o botón
    left: 0;
    border-top: 1px solid ${({ theme }) => theme.navbarText};
  }
`;

// Estilos para los elementos de la lista
const NavItem = styled.li`
  margin: 10px 0;

  @media (max-width: 768px) {
    padding: 10px 20px;
    width: 100%;
  }
`;

// Estilos para los enlaces de navegación
const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.navbarText};
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-left: 10px;

  &:hover {
    color: ${({ theme }) => theme.navbarHoverText};
  }
`;

export { NavbarContainer, Logo, Hamburger, NavList, NavItem, NavLink };
