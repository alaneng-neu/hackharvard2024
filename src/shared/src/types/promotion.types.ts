import { Business } from "./business.types";
import { User } from "./user.types";

export enum PromotionType {
  PERCENT_DISCOUNT = "PERCENT_DISCOUNT",
  VALUE_DISCOUNT = "VALUE_DISCOUNT",
}

export interface Promotion {
  id: string;
  business: Business;
  quantity: number;
  type: PromotionType;
  value: number;
}

export interface Coupon {
  id: string;
  promotion: Promotion;
  user: User;
}
