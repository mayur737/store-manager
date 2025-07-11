import { IoClose } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "../contexts/AllContext";
import { FaStore, FaUsers } from "react-icons/fa";

const SidebarComponent = ({ isSidebarOpen, toggleSidebar, isMobile }) => {
  const [state] = useContext(GlobalContext);
  const role = state?.user?.role;
  const { pathname } = useLocation();
  const [openAccordion, setOpenAccordion] = useState(null);

  const isActive = (menuPaths) =>
    menuPaths.some((path) => pathname.startsWith(path));
  const Menus = [];

  if (role === "ADMIN") {
    Menus.push(
      {
        title: "Dashboard",
        path: ["/dashboard"],
        icon: <MdOutlineDashboard size={25} />,
      },
      {
        title: "Users",
        path: ["/users", "/users/add"],
        icon: <FaUsers size={25} />,
      },
      {
        title: "Stores",
        path: ["/stores", "/stores/add"],
        icon: <FaStore size={25} />,
      }
    );
  }

  if (role === "USER") {
    Menus.push({
      title: "Stores",
      path: ["/dashboard"],
      icon: <FaStore />,
    });
  }

  if (role === "OWNER") {
    Menus.push({
      title: "My Store Ratings",
      path: ["/dashboard"],
      icon: <MdOutlineDashboard size={25} />,
    });
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-50 border-r-4 border-gray-500
        transition-transform duration-300 ease-in-out
        ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }
        ${isSidebarOpen ? "w-64" : "w-20"}
        ${isMobile ? "top-0" : "top-14"}`}
    >
      {isMobile && (
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <IoClose size={24} className="text-primary" />
          </button>
        </div>
      )}
      <nav className="mt-4">
        {Menus.map((Menu, index) => {
          const isParentActive = Menu.children
            ? Menu.children.some((child) => pathname.startsWith(child.path))
            : isActive(Menu.path);

          return Menu.children ? (
            <div key={index} className="relative group">
              <div
                onClick={() =>
                  setOpenAccordion(
                    openAccordion === Menu.title ? null : Menu.title
                  )
                }
                className={`flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all duration-200 mt-2 cursor-pointer ${
                  isParentActive
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    : "text-secondary hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100"
                }`}
              >
                <div className="flex items-center">
                  <span className="min-w-[24px]">{Menu.icon}</span>
                  {isSidebarOpen && (
                    <span className="ml-3 font-medium whitespace-nowrap">
                      {Menu.title}
                    </span>
                  )}
                </div>
                {isSidebarOpen && (
                  <span className="ml-auto">
                    {openAccordion === Menu.title ? (
                      <IoIosArrowUp size={18} />
                    ) : (
                      <IoIosArrowDown size={18} />
                    )}
                  </span>
                )}
              </div>

              {isSidebarOpen && openAccordion === Menu.title && (
                <div className="ml-5 mt-1 pr-4 space-y-1">
                  {Menu.children.map((child, idx) => (
                    <Link
                      to={child.path}
                      key={idx}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
                        pathname.startsWith(child.path)
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-blue-50"
                      }`}
                      onClick={isMobile ? toggleSidebar : undefined}
                    >
                      {child.icon && (
                        <span className="text-gray-500">{child.icon}</span>
                      )}
                      <span className="font-semibold text-gray-600">
                        {child.title}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
              {!isSidebarOpen && (
                <div className="absolute left-full top-1 group-hover:block hidden z-50">
                  <div className="bg-white shadow-lg rounded-md p-2 w-48">
                    {Menu.children.map((child, idx) => (
                      <Link
                        to={child.path}
                        key={idx}
                        className={`block px-3 py-2 rounded-md font-semibold text-sm ${
                          pathname.startsWith(child.path)
                            ? "bg-blue-200 text-blue-500"
                            : "hover:bg-blue-50 text-gray-800"
                        }`}
                        onClick={isMobile ? toggleSidebar : undefined}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              to={Menu.path[0]}
              className={`group flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-200 mt-2 ${
                isActive(Menu.path)
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "text-secondary hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100"
              } ${!isSidebarOpen && "justify-center"}`}
              onClick={isMobile ? toggleSidebar : undefined}
            >
              <span className={`min-w-[24px] ${!isSidebarOpen && "mx-auto"}`}>
                {Menu.icon}
              </span>
              {isSidebarOpen && (
                <span className="ml-3 font-medium whitespace-nowrap">
                  {Menu.title}
                </span>
              )}

              {!isSidebarOpen && (
                <div className="absolute left-full ml-6 hidden group-hover:block z-50">
                  <div className="bg-gray-800 text-white text-sm px-2 py-1 rounded-md whitespace-nowrap">
                    {Menu.title}
                  </div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarComponent;
