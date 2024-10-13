import { Business } from "./business.types";
import { Coupon } from "./promotion.types";

export interface User {
  id: string;
  name: string;
  email: string;
  businesses: Business[];
  coupons: Coupon[];
}
