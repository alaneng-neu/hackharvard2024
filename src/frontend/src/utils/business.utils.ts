import { Promotion, PromotionType } from "../../../shared";

export const promotionToString = (promotion: Promotion): string => {
  
  if (promotion.type === PromotionType.PERCENT_DISCOUNT) {
    return `${promotion.value}% off`;
  } else {
    return `$${promotion.value} off`;
  }
};
