import { Outlet } from 'react-router-dom';
import ThemeSwitcher from './components/ThemeSwitcher';

function Layout() {
  return (
    <div>
      <ThemeSwitcher />
      <Outlet />
    </div>
  );
}

export default Layout;
