import { Prisma } from "@prisma/client";

export const couponQueryArgs = Prisma.validator<Prisma.CouponDefaultArgs>()({
  include: {
    promotion: true,
    user: true,
  },
});
