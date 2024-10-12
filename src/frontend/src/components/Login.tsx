import React from "react";

const Login: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-screen">
      <span className="absolute text-black text-5xl mb-[20rem]">Sign in</span>
      <img src="/logo.png" className="absolute h-12 w-35 mb-[13rem]"></img>
      <div className="h-28 w-60 relative border bg-slate-300 rounded-md flex items-center justify-center">
        <button className="flex items-center bg-white text-gray-800 border border-gray-300 rounded-lg shadow-md p-3 hover:bg-gray-100 transition duration-200">
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            className="w-7 h-7"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
