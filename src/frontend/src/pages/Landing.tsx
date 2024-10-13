import React from "react";
import { Search, Store } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-between"
      style={{ backgroundImage: `url(/background.jpg)` }}>
      {/* Header */}
      <div className="w-full flex justify-between items-center p-4">
        <div>
          <a href="/" className="flex items-center">
            <img
              src="/logo_drop.svg"
              alt="Local.ly Logo"
              className="h-12 w-auto"
            />
          </a>
        </div>
        <button
          className="px-4 py-2 bg-black text-white rounded-md"
          onClick={() => {
            window.location.href = "/user/login";
          }}>
          Log in
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-start flex-grow text-white w-full max-w-4xl text-left pl-20">
        <h2 className="text-5xl font-bold mb-8 text-white">
          Discover gems near you ✨
        </h2>

        {/* Side by side buttons with gap */}
        <div className="flex mb-8 w-full max-w-lg gap-4">
          <button className="flex items-center justify-center p-4 bg-white text-black rounded-md w-1/2 gap-2">
            <Search size={20} />
            Discover Local Treasures
          </button>
          <button className="flex items-center justify-center p-4 bg-black text-white rounded-md w-1/2 gap-2">
            <Store size={20} />
            List Your Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
