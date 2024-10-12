import React from "react";
const Login: React.FC = () => {
  return (
    <div>
      <div className="bg-black shadow-sm">
        <a href="/" className="flex items-center p-3">
          <img
            src="/logo_white.svg"
            alt="Local.ly Logo"
            className="h-10 w-auto"
          />
        </a>
      </div>
      <div className="relative flex items-center justify-center h-screen">
        <span className="absolute text-black text-5xl mb-[20rem]">Sign in</span>
        <img src="/gem.svg" className="absolute h-12 w-35 mb-[10rem]"></img>
        <button className="flex items-center bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md p-3 hover:bg-gray-100 transition duration-200">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            className="w-7 h-7 mr-2"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
