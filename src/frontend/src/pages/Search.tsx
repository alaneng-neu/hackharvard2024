import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import DropdownFilter from "../components/DropdownFilter.tsx";
import ToggleFilter from "../components/ToggleFilter.tsx";
import BusinessCard from "../components/BusinessCard";
import { Business, BusinessType } from "../../../shared/index.ts";

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

const testBusinesses: Business[] = [
  {
    id: "1",
    name: "Sunset Diner",
    description: "A classic spot for breakfast and brunch.",
    businessTypes: [BusinessType.FOOD_AND_BEVERAGE],
    location: { address: "123 Main St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "20% off pancakes!",
  },
  {
    id: "2",
    name: "Tech World",
    description: "Your one-stop shop for the latest gadgets.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "456 Elm St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Healthy Life Gym",
    description:
      "Get fit and stay healthy with our state-of-the-art facilities.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "789 Maple St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "Free 1-day trial!",
  },
  {
    id: "4",
    name: "Fashion Hub",
    description: "Trendy clothing for all seasons.",
    businessTypes: [BusinessType.CLOTHING_AND_ACCESSORIES],
    location: { address: "101 Oak St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "EduCare Tutoring",
    description: "Personalized tutoring services for all ages.",
    businessTypes: [BusinessType.EDUCATION],
    location: { address: "202 Pine St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Green Garden",
    description: "Sustainable and fresh gardening supplies.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "303 Cedar St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Digital Innovators",
    description: "Tech consulting for modern businesses.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "404 Birch St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Community Outreach",
    description: "Non-profit organization supporting local initiatives.",
    businessTypes: [BusinessType.NON_PROFIT],
    location: { address: "505 Willow St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    name: "City Spa",
    description: "Relax and unwind with our full range of spa services.",
    businessTypes: [BusinessType.SERVICES],
    location: { address: "606 Poplar St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "10% off massages!",
  },
  {
    id: "10",
    name: "Artisan Bakery",
    description: "Handcrafted bread and pastries fresh daily.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "707 Chestnut St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "Buy 2 get 1 free!",
  },
  {
    id: "11",
    name: "Fitness Pro",
    description: "Personal training and group fitness classes.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "808 Walnut St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "Free first session!",
  },
  {
    id: "12",
    name: "Tech Innovate",
    description: "Innovative tech solutions for your business.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "909 Aspen St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "13",
    name: "Book Haven",
    description: "A paradise for book lovers with a vast collection.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "1010 Pinecone St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "10% off on all novels!",
  },
  {
    id: "14",
    name: "Urban Retreat",
    description: "Luxury spa services in the heart of the city.",
    businessTypes: [BusinessType.SERVICES],
    location: { address: "1111 Maplewood St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "15% off your first massage!",
  },
  {
    id: "15",
    name: "Eco Essentials",
    description: "Sustainable products for everyday living.",
    businessTypes: [BusinessType.RETAIL],
    location: { address: "1212 Oakleaf St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
  {
    id: "16",
    name: "Creative Minds",
    description: "Art workshops and creative classes for all ages.",
    businessTypes: [BusinessType.EDUCATION],
    location: { address: "1313 Pine St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "20% off on first class!",
  },
  {
    id: "17",
    name: "HealthPlus Clinic",
    description: "Comprehensive healthcare services for the community.",
    businessTypes: [BusinessType.HEALTH_AND_WELLNESS],
    location: { address: "1414 Cedar St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
    specialOffer: "Free consultation!",
  },
  {
    id: "18",
    name: "GreenTech Solutions",
    description: "Eco-friendly technology for modern businesses.",
    businessTypes: [BusinessType.TECHNOLOGY],
    location: { address: "1515 Birch St, Springfield" },
    imageUrl: "https://via.placeholder.com/150",
  },
];

const Search: React.FC = () => {
  const [businesses] = useState<Business[]>(testBusinesses);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <main className="w-3/5">
          <div className="flex justify-between py-6">
            <div className="flex gap-4">
              <DropdownFilter
                options={categories}
                label="Select a Category"
                width="60"
              />
              <ToggleFilter label="Promotions" />
            </div>
            <button>Clear Filters</button>
          </div>

          <div className="flex justify-center">
            <h1 className="py-4 text-4xl text-center">
              Start searching to find local gems!
            </h1>
          </div>

          <div className="flex-col gap-6">
            <p className="text-xl font-semibold mb-4">Trending</p>
            <div className="grid grid-cols-3 gap-4">
              {businesses.slice(0, 3).map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>

          <div className="flex-col gap-6 mt-8">
            <p className="text-xl font-semibold mb-4">Suggestions</p>
            <div className="grid grid-cols-3 gap-4">
              {businesses.slice(3, 6).map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>

          <div className="flex-col gap-6 mt-8">
            <p className="text-xl font-semibold mb-4">Nearby</p>
            <div className="grid grid-cols-3 gap-4">
              {businesses.slice(6, 9).map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Search;
