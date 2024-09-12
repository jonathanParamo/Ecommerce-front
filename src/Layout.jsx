import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function Layout() {
  return (
    <div className="flex flex-col m-0 overflow-x-hidden">
      <Navbar />
      <div className="pt-[72px]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
