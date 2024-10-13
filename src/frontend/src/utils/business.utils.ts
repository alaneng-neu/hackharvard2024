import { Promotion, PromotionType } from "../../../shared";

export const promotionToString = (promotion: Promotion): string => {
  if (promotion.type === PromotionType.PERCENT_DISCOUNT) {
    return `${promotion.value}% off`;
  } else {
    return `$${promotion.value} off`;
  }
};

export const formatCategoryName = (category: string) => {
  return category
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
