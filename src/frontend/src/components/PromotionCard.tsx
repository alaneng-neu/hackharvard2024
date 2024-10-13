import React from "react";
import { Promotion } from "../../../shared";
import { promotionToString } from "../utils/business.utils";
interface PromotionCardProps {
  promotion: Promotion;
}

const PromotionCard: React.FC<PromotionCardProps> = ({ promotion }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-sm mx-auto">
      <p className="ml-3 font-semibold text-gray-700">
        <span>Get {promotionToString(promotion)}</span>
      </p>
    </div>
  );
};

export default PromotionCard;
