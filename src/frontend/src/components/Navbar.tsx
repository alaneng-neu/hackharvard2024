import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center h-20 px-4 bg-stone-100 m-0">
      <div className="flex items-center">
        <a href="/search">
          <img src="/logo.svg" alt="Local.ly Logo" className="h-12 w-auto" />
        </a>
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-2/5">
        <input
          type="text"
          placeholder="Search for Businesses..."
          className="w-full py-2 px-4 rounded-full bg-stone-200 text-black text-sm"
        />
      </div>

      <div>
        <button
          className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-200"
          onClick={() => {
            window.location.href = "/user/login";
          }}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
