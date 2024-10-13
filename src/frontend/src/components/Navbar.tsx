import React, { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  searchValue: string; // Add this prop
  setSearchValue: React.Dispatch<React.SetStateAction<string>>; // Add this prop
}

const Navbar: React.FC<NavbarProps> = ({ searchValue, setSearchValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex justify-between items-center h-20 px-4 bg-stone-100 m-0 relative">
      <div className="flex items-center">
        <a href="/">
          <img src="/logo.svg" alt="Local.ly Logo" className="h-12 w-auto" />
        </a>
      </div>

      {/* Search Bar */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-2/5 hidden md:block">
        <input
          type="text"
          value={searchValue} // Use the search value from props
          onChange={(e) => setSearchValue(e.target.value)} // Update the search value on change
          placeholder="Search for Businesses..."
          className="w-full py-2 px-4 rounded-full bg-stone-200 text-black text-sm"
        />
      </div>

      {/* Login Button */}
      <div className="hidden md:block">
        <button
          className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
          onClick={() => {
            window.location.href = "/user/login";
          }}
        >
          Login
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-800 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-lg z-50">
          <div className="flex flex-col items-center py-2">
            <a
              href="/"
              className="py-2 text-gray-800 hover:bg-gray-200 w-full text-center"
            >
              Search Page
            </a>
            <a
              href="/user/login"
              className="py-2 text-gray-800 hover:bg-gray-200 w-full text-center"
            >
              User Page
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
