// Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function Layout() {
  return (
    <div className="h-screen flex flex-col m-0 overflow-x-hidden">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
