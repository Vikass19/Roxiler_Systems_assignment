
import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = [
    {
      role: "NORMAL_USER",
      label: "Stores",
      path: "/stores",
    },
    {
      role: "STORE_OWNER",
      label: "Owner Dashboard",
      path: "/owner/dashboard",
    },
    {
      role: "SYSTEM_ADMINISTRATOR",
      label: "Admin Dashboard",
      path: "/admin/dashboard",
    },
    {
      role: "ANY",
      label: "Profile",
      path: "/profile",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide text-gray-100">
          Store rating
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-200">
          {links.map(
            (link) =>
              (link.role === "ANY" || user?.role === link.role) && (
                <Link
                  key={link.label}
                  to={link.path}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              )
          )}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Hi, {user.name}</span>

              <button
                onClick={handleLogout}
                className="rounded bg-gray-700 px-4 py-1 text-white transition-colors duration-200 hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded bg-gray-700 px-4 py-1 text-white transition-colors duration-200 hover:bg-gray-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded bg-gray-700 px-4 py-1 text-white transition-colors duration-200 hover:bg-gray-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-gray-800 md:hidden">
          <div className="flex flex-col space-y-3 p-4">
            {links.map(
              (link) =>
                (link.role === "ANY" || user?.role === link.role) && (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-200 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
            )}

            {user ? (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="rounded bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded bg-gray-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-gray-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}