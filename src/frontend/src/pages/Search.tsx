import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";
import DropdownFilter from "../components/DropdownFilter.tsx";
import ToggleFilter from "../components/ToggleFilter.tsx";
import BusinessCard from "../components/BusinessCard";
import { useGetBusinessTypes } from "../hooks/useGetBusinessTypes";
import {
  Business,
  BusinessType,
  PromotionType,
} from "../../../shared/index.ts";

// TODO: Fetch from API
const dummyBusiness: Business = {
  id: "1",
  name: "Sunset Diner",
  description: "A classic spot for breakfast and brunch.",
  businessTypes: [BusinessType.FOOD_AND_BEVERAGE],
  location: { address: "123 Main St, Springfield" },
  promotions: [],
};

// TODO: Fetch from API
const testBusinesses: Business[] = [
  {
    id: "1",
    name: "Sunset Diner",
    description: "A classic spot for breakfast and brunch.",
    businessTypes: [BusinessType.FOOD_AND_BEVERAGE],
    location: { address: "123 Main St, Springfield" },
    promotions: [
      {
        id: "1",
        business: dummyBusiness,
        quantity: 5,
        type: PromotionType.VALUE_DISCOUNT,
        value: 10,
      },
      {
        id: "2",
        business: dummyBusiness,
        quantity: 5,
        type: PromotionType.PERCENT_DISCOUNT,
        value: 15,
      },
    ],
  },
  {
    id: "2",
    name: "Tech World",
    description: "Your one-stop shop for the latest gadgets.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "456 Elm St, Springfield" },
    promotions: [],
  },
  {
    id: "3",
    name: "Healthy Life Gym",
    description:
      "Get fit and stay healthy with our state-of-the-art facilities.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "789 Maple St, Springfield" },
    promotions: [
      {
        id: "3",
        business: dummyBusiness,
        quantity: 5,
        type: PromotionType.PERCENT_DISCOUNT,
        value: 8,
      },
    ],
  },
  {
    id: "4",
    name: "Fashion Hub",
    description: "Trendy clothing for all seasons.",
    businessTypes: [BusinessType.CLOTHING_AND_ACCESSORIES],
    location: { address: "101 Oak St, Springfield" },
    promotions: [],
  },
  {
    id: "5",
    name: "EduCare Tutoring",
    description: "Personalized tutoring services for all ages.",
    businessTypes: [BusinessType.EDUCATION],
    location: { address: "202 Pine St, Springfield" },
    promotions: [],
  },
  {
    id: "6",
    name: "Green Garden",
    description: "Sustainable and fresh gardening supplies.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "303 Cedar St, Springfield" },
    promotions: [],
  },
  {
    id: "7",
    name: "Digital Innovators",
    description: "Tech consulting for modern businesses.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "404 Birch St, Springfield" },
    promotions: [],
  },
  {
    id: "8",
    name: "Community Outreach",
    description: "Non-profit organization supporting local initiatives.",
    businessTypes: [BusinessType.NON_PROFIT],
    location: { address: "505 Willow St, Springfield" },
    promotions: [],
  },
  {
    id: "9",
    name: "City Spa",
    description: "Relax and unwind with our full range of spa services.",
    businessTypes: [BusinessType.SERVICES],
    location: { address: "606 Poplar St, Springfield" },
    promotions: [],
  },
  {
    id: "10",
    name: "Artisan Bakery",
    description: "Handcrafted bread and pastries fresh daily.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "707 Chestnut St, Springfield" },
    promotions: [],
  },
  {
    id: "11",
    name: "Fitness Pro",
    description: "Personal training and group fitness classes.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "808 Walnut St, Springfield" },
    promotions: [],
  },
  {
    id: "12",
    name: "Tech Innovate",
    description: "Innovative tech solutions for your business.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "909 Aspen St, Springfield" },
    promotions: [],
  },
  {
    id: "13",
    name: "Book Haven",
    description: "A paradise for book lovers with a vast collection.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "1010 Pinecone St, Springfield" },
    promotions: [],
  },
  {
    id: "14",
    name: "Urban Retreat",
    description: "Luxury spa services in the heart of the city.",
    businessTypes: [BusinessType.SERVICES],
    location: { address: "1111 Maplewood St, Springfield" },
    promotions: [],
  },
  {
    id: "15",
    name: "Eco Essentials",
    description: "Sustainable products for everyday living.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "1212 Oakleaf St, Springfield" },
    promotions: [],
  },
  {
    id: "16",
    name: "Creative Minds",
    description: "Art workshops and creative classes for all ages.",
    businessTypes: [BusinessType.EDUCATION],
    location: { address: "1313 Pine St, Springfield" },
    promotions: [],
  },
  {
    id: "17",
    name: "HealthPlus Clinic",
    description: "Comprehensive healthcare services for the community.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "1414 Cedar St, Springfield" },
    promotions: [],
  },
  {
    id: "18",
    name: "GreenTech Solutions",
    description: "Eco-friendly technology for modern businesses.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "1515 Birch St, Springfield" },
    promotions: [],
  },
];

const Search: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>(testBusinesses);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isPromotionOn, setIsPromotionOn] = useState(false);
  const categories = useGetBusinessTypes();

  // useEffect(() => {
  //   fetch("http://localhost:7071/business/search")
  //     .then((res) => res.json())
  //     .then((data: Business[]) => {
  //       setBusinesses(data);
  //     });
  // }, []);

  const resetFilters = () => {
    setSelectedOptions([]);
    setIsPromotionOn(false);
  };

  return (
    <div>
      <Navbar />
      {businesses && (
        <div className="flex justify-center">
          <main className="w-11/12 lg:w-4/5">
            <div className="flex flex-col lg:flex-row lg:justify-between py-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <DropdownFilter
                  options={categories}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                  label="Browse Categories"
                  width="80"
                ></DropdownFilter>
                <ToggleFilter
                  label="Promotion"
                  isOn={isPromotionOn}
                  setIsOn={setIsPromotionOn}
                />
              </div>
              <button
                onClick={resetFilters}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear Filters
              </button>
            </div>

            <div className="flex justify-center">
              <h1 className="py-4 text-4xl text-center">
                Start searching to find local gems!
              </h1>
            </div>

            <div className="flex-col gap-6">
              <p className="text-xl font-semibold mb-4">Trending</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.slice(0, 3).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>

            <div className="flex-col gap-6 mt-8">
              <p className="text-xl font-semibold mb-4">Suggestions</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.slice(3, 6).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>

            <div className="flex-col gap-6 mt-8">
              <p className="text-xl font-semibold mb-4">Nearby</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businesses.slice(6, 9).map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

export default Search;
