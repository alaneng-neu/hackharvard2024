import React from "react";

const Landing: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-between px-4"
      style={{ backgroundImage: `url(/background.jpg)` }}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center py-4">
        <h1 className="text-3xl font-bold text-black">Local.ly</h1>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Log in
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-start flex-grow text-white">
        <h2 className="text-4xl font-bold mb-6">Discover gems near you</h2>

        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Enter zipcode"
            className="p-3 w-64 rounded-l-md border-none focus:ring-2 focus:ring-black text-black"
          />
          <button className="p-3 bg-black text-white rounded-r-md">
            Search
          </button>
        </div>

        <a href="#" className="text-white underline">
          Business? Onboard here
        </a>
      </div>
    </div>
  );
};

export default Landing;
