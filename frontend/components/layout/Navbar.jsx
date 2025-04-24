import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">
              Global Stories
            </Link>
          </div>

          {/* dektop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
            >
              Home
            </Link>
            <Link
              to="/posts"
              className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
            >
              Stories
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/create-post"
                  className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
                >
                  Create Story
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
                >
                  Profile
                </Link>
                <span>Hello, {currentUser.name}</span>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-md font-medium text-gray-700 hover:text-blue-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none cursor-pointer"
              aria-expanded="false"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <div className={`${menuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Home
          </Link>

          <Link
            to="/posts"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          >
            Stories
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to="/create-story"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Create Story
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Profile
              </Link>
              <span className="block px-3 py-2 text-gray-700">
                Hello,{currentUser.name.split(" ")[0]}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
