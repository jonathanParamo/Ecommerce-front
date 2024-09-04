import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Container } from './utils/Container';

function Layout() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

export default Layout;
