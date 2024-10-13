import { Prisma } from "@prisma/client";
import { userQueryArgs } from "../prisma-query-args/user.query-args";
import { User } from "../../../shared";
import { businessTransformer } from "./business.transformers";
import { couponTransformer } from "./coupon.transformers";

export const userTransformer = (
  user: Prisma.UserGetPayload<typeof userQueryArgs>
): User => {
  return {
    ...user,
    businesses: user.businesses.map(businessTransformer),
    coupons: user.coupons.map(couponTransformer),
  };
};
