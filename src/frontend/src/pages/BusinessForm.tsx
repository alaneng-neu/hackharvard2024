import React, { useState } from "react";
import DropdownFilter from "../components/DropdownFilter";
import Navbar from "../components/Navbar";
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
const BusinessForm: React.FC = () => {
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ businessName, address, description });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex justify-center text-3xl mt-12">
        Register your business
      </div>
      <div className="flex items-center justify-center h-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded px-8 py-6 w-96"
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mt-8 font-bold mb-2">
              Business Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Business Type
            </label>
            <DropdownFilter
              options={categories}
              label="Select a type"
              width="60"
            ></DropdownFilter>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              rows={4}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-[#5aa157] hover:bg-[#3f6b3d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusinessForm;
