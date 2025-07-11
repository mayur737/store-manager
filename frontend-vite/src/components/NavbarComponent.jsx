import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import DropdownWithIcon from "./DropdownWithIcon";

const NavbarComponent = ({ toggleSidebar }) => {
  return (
    <header className="h-14 bg-white border-b-4 border-gray-500 sticky top-0 z-40 shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            <GiHamburgerMenu className="w-6 h-6 text-gray-800" />
          </button>

          <Link to="/dashboard" className="flex items-center"></Link>
        </div>

        <DropdownWithIcon />
      </div>
    </header>
  );
};

export default NavbarComponent;
