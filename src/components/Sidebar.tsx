import { Link, useLocation } from "react-router-dom";
import logo from "../assets/large_hrpanel.png";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
  ];

  return (
    <div className="fixed w-56 bg-white shadow-md h-screen p-4 flex flex-col">
      <img
        src={logo}
        alt="HR Panel Logo"
        className="w-46 h-24 object-contain mb-6"
      />

      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2 rounded-md text-gray-700 font-medium transition-colors duration-200
              ${
                location.pathname === link.path
                  ? "bg-blue-500 text-white hover:bg-blue-600 visited:text-white"
                  : "text-gray-700 hover:bg-blue-100 visited:text-gray-700"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
