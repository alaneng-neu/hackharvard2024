import React from "react";

const Landing: React.FC = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-between px-2" // Reduced padding
      style={{ backgroundImage: `url(/background.jpg)` }}
    >
      {/* Header */}
      <div className="w-full flex justify-between items-center py-4 pl-5">
        <div>
          <a href="/" className="flex items-center">
            <img src="/logo.svg" alt="Local.ly Logo" className="h-12 w-auto" />
          </a>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-md">
          Log in
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-start flex-grow text-white w-full max-w-4xl text-left pl-20">
        {" "}
        {/* Added negative margin */}
        <h2 className="text-5xl font-bold mb-8 text-black">
          Discover gems near you
        </h2>
        {/* Search Bar */}
        <div className="flex items-center mb-8 w-full max-w-lg">
          <input
            type="text"
            placeholder="Enter zipcode"
            className="p-4 w-full rounded-l-md border-none focus:ring-2 focus:ring-black text-black"
          />
          <button className="p-4 bg-black text-white rounded-r-md">
            Search
          </button>
        </div>
        <a href="#" className="text-black underline text-lg">
          Business? Onboard here
        </a>
      </div>
    </div>
  );
};

export default Landing;
