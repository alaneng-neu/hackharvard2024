import React from "react";

const AuthNavbar = () => {
  return (
    <div className="bg-black shadow-sm">
      <a href="/" className="flex items-center p-2">
        <img
          src="/logo_white.svg"
          alt="Local.ly Logo"
          className="h-10 mb-3 w-auto ml-3"
        />
      </a>
    </div>
  );
};

export default AuthNavbar;
