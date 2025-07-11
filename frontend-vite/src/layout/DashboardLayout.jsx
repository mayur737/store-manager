import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import SidebarComponent from '../components/SidebarComponent';

const DashboardLayout = () => {
  const getInitialSidebarState = () => {
    const savedState = localStorage.getItem('sidebarOpen');
    if (savedState !== null) {
      return JSON.parse(savedState);
    }
    return window.innerWidth >= 768;
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(getInitialSidebarState);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      // Only auto-open sidebar on desktop if there's no saved preference
      if (localStorage.getItem('sidebarOpen') === null) {
        setIsSidebarOpen(width >= 768);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('sidebarOpen', JSON.stringify(newState));
      return newState;
    });
  };

  // If on mobile and sidebar is open, force close it
  useEffect(() => {
    if (isMobile ) {
      setIsSidebarOpen(false);
      localStorage.setItem('sidebarOpen', 'false');
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-secondary overflow-hidden">
      {/* Overlay for mobile */}
      {isMobile && isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar} />}

      {/* Sidebar */}
      <SidebarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 overflow-y-auto bg-secondary p-4 transition-all duration-300 custom-scrollbar
          ${isMobile ? 'ml-0' : isSidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
