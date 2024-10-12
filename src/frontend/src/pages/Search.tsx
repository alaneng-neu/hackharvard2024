import React from "react";
import Navbar from "../components/Navbar.tsx";
import DropdownFilter from "../components/DropdownFilter.tsx";
import ToggleFilter from "../components/ToggleFilter.tsx";

const categories = [
  "Dining",
  "Retail",
  "Fashion",
  "Health",
  "Entertainment",
  "Hospitality",
  "Services",
  "Education",
  "Technology",
  "Non-Profit",
];

const Search: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <main className="w-3/5">
          <div className="flex justify-between py-6">
            <div className="flex gap-4">
              <DropdownFilter options={categories} label="Select a Category" />
              <ToggleFilter label="Promotions" />
            </div>
            <button>Clear Filters</button>
          </div>

          <div className="flex justify-center">
            <h1 className="py-4 text-4xl text-center">
              Start searching to find <br />
              local gems!
            </h1>
          </div>

          <div className="flex-col gap-2">
            <p>Trending</p>
            <div className="flex">{/* 3x business card */}</div>
          </div>

          <div className="flex-col gap-2">
            <p>Suggestions</p>
            <div className="flex">{/* 3x business card */}</div>
          </div>

          <div className="flex-col gap-2">
            <p>Nearby</p>
            <div className="flex">{/* 3x business card */}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
