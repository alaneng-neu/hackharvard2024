import { Prisma } from "@prisma/client";
import { Coupon } from "../../../shared";
import { couponQueryArgs } from "../prisma-query-args/coupon.query-args";
import { promotionTransformer } from "./promotion.transformers";
import { userTransformer } from "./user.transformers";

export const couponTransformer = (
  coupon: Prisma.CouponGetPayload<typeof couponQueryArgs>
): Coupon => {
  if (!coupon) return null;
  return {
    ...coupon,
    promotion: promotionTransformer(coupon.promotion),
    user: userTransformer(coupon.user),
  };
};
