import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="pl-64">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
