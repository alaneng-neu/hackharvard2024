import { Prisma } from "@prisma/client";
import { userQueryArgs } from "../prisma-query-args/user.query-args";
import { User } from "../../../shared";
import { businessTransformer } from "./business.transformers";
import { couponTransformer } from "./coupon.transformers";

export const userTransformer = (
  user: Prisma.UserGetPayload<typeof userQueryArgs>
): User => {
  if (!user) return null;
  return {
    ...user,
    businesses: user.businesses.map(businessTransformer),
    coupons: user.coupons.map(couponTransformer),
  };
};
