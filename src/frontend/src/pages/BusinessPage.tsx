import React, { useEffect, useState } from "react";
import {
  Business,
  Location,
  BusinessType,
  PromotionType,
} from "../../../shared/index";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PromotionCard from "../components/PromotionCard";

const BusinessPage: React.FC = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business>();

  useEffect(() => {
    fetch(`http://localhost:7071/business/${id}/get`)
      .then((res) => res.json())
      .then((data: Business) => {
        setBusiness(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
      {business ? (
        <div>
          <Navbar></Navbar>
          <div className="p-4 max-w-lg mx-auto sm:p-8 md:p-12 lg:p-16">
            <img src="/gem.svg"></img>
            <h1 className="text-2xl font-bold">{business.name}</h1>
            <p className="mt-2 text-gray-700">{business.description}</p>
            <h2 className="mt-4 text-xl font-semibold">Details:</h2>
            <p>
              <strong>Location: {business.location.address}</strong>
            </p>
            <p>
              <strong>Type:</strong> {business.businessTypes}
            </p>
            <div>
              Promotions:{" "}
              {business.promotions ? (
                business.promotions.map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                  ></PromotionCard>
                ))
              ) : (
                <div>No promotions available</div>
              )}{" "}
            </div>
          </div>
        </div>
      ) : (
        <div>Business is not loaded</div>
      )}
    </>
  );
};

export default BusinessPage;
