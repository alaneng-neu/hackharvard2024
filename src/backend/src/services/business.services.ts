import prisma from "../prisma/prisma";
import { Business, BusinessType, Coupon, Promotion } from "../../../shared";
import { businessTransformer } from "../transformers/business.transformers";
import { promotionTransformer } from "../transformers/promotion.transformers";
import { stringToBusinessType } from "../utils/business.utils";
import { businessQueryArgs } from "../prisma-query-args/business.query-args";
import { HttpException } from "../utils/error.utils";
import { stringToPromotionType } from "../utils/promotion.utils";
import { promotionQueryArgs } from "../prisma-query-args/promotion.query-args";
import { couponQueryArgs } from "../prisma-query-args/coupon.query-args";
import { getUserFromIdToken } from "../utils/user.utils";
import { couponTransformer } from "../transformers/coupon.transformers";

export default class BusinessService {
  static async createBusiness(
    idToken: string,
    name: string,
    location: string,
    businessTypes: string[],
    description: string | undefined
  ): Promise<Business> {
    if (!name)
      throw new HttpException(400, "Missing a name to create a new business");
    if (!location)
      throw new HttpException(
        400,
        "Missing a location to create a new business"
      );
    if (businessTypes.length == 0)
      throw new HttpException(
        400,
        "Missing business types to create a new business"
      );

    const owner = await getUserFromIdToken(idToken);
    const ownerId = owner.id;

    const types = businessTypes.map(stringToBusinessType);
    const createdBusiness = await prisma.business.create({
      data: {
        owner: { connect: { id: ownerId } },
        name,
        location: { create: { address: location } },
        businessTypes: { set: types },
        description,
      },
      ...businessQueryArgs,
    });

    return businessTransformer(createdBusiness);
  }

  static async getAllBusinesses(): Promise<Business[]> {
    const businesses = await prisma.business.findMany();

    return businesses.map(businessTransformer);
  }

  static async getBusiness(businessId: string): Promise<Business> {
    if (!businessId)
      throw new HttpException(400, "Cannot get a business without an id");

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });

    if (!business)
      throw new HttpException(
        404,
        `The business with id ${businessId} does not exist!`
      );

    return businessTransformer(business);
  }

  static async getBusinessTypes(): Promise<string[]> {
    return Object.values(BusinessType);
  }

  static async editBusiness(
    businessId: string,
    name: string,
    location: string,
    businessTypes: string[],
    description: string | undefined
  ): Promise<Business> {
    if (!businessId) throw new HttpException(400, "Must provide a business id");
    if (!name) throw new HttpException(400, "Missing a name to edit business");
    if (!location)
      throw new HttpException(400, "Missing a location to edit business");
    if (businessTypes.length == 0)
      throw new HttpException(400, "Missing business types to edit business");

    const ownerId = "1"; // TODO: Get the owner id from the request

    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });
    if (!existingBusiness)
      throw new HttpException(
        400,
        `The business with id ${businessId} does not exist!`
      );

    const types = businessTypes.map(stringToBusinessType);
    const updatedLocation = await prisma.location.update({
      where: { id: existingBusiness.location.id },
      data: { address: location },
    });
    const editedBusiness = await prisma.business.update({
      where: {
        id: businessId,
      },
      data: {
        name,
        locationId: updatedLocation.id,
        businessTypes: { set: types },
        description,
      },
      ...businessQueryArgs,
    });

    return businessTransformer(editedBusiness);
  }

  static async getPromos(businessId: string): Promise<Promotion[]> {
    if (!businessId) throw new HttpException(400, "Must provide a business id");

    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });
    if (!existingBusiness)
      throw new HttpException(
        400,
        `The business with id ${businessId} does not exist!`
      );

    return existingBusiness.promotions.map(promotionTransformer);
  }

  static async createPromo(
    idToken: string,
    businessId: string,
    type: string,
    value: number,
    quantity: number
  ): Promise<Promotion> {
    if (!idToken) throw new HttpException(400, "Must provide an id token");
    if (!businessId) throw new HttpException(400, "Must provide a business id");
    if (!type) throw new HttpException(400, "Must provide a promo type");
    if (!value) throw new HttpException(400, "Must provide a promo value");
    if (!quantity)
      throw new HttpException(400, "Must provide a promo quantity");

    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });
    if (!existingBusiness)
      throw new HttpException(
        400,
        `The business with id ${businessId} does not exist!`
      );

    const owner = await getUserFromIdToken(idToken);
    const ownerId = owner.id;
    if (existingBusiness.ownerId !== ownerId)
      throw new HttpException(403, "You are not the owner of this business");

    const createdPromo = await prisma.promotion.create({
      data: {
        businessId,
        type: stringToPromotionType(type),
        value: Number(value),
        quantity: Number(quantity),
      },
      include: promotionQueryArgs.include,
    });

    return promotionTransformer(createdPromo);
  }

  static async getCoupon(
    idToken: string,
    businessId: string,
    couponId: string
  ): Promise<Coupon> {
    if (!idToken) throw new HttpException(400, "Must provide an id token");
    if (!businessId) throw new HttpException(400, "Must provide a business id");
    if (!couponId) throw new HttpException(400, "Must provide a promo id");

    const owner = await getUserFromIdToken(idToken);
    const ownerId = owner.id;

    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      ...couponQueryArgs,
    });
    if (!coupon)
      throw new HttpException(
        400,
        `The coupon with id ${couponId} does not exist!`
      );
    if (coupon.userId !== ownerId)
      throw new HttpException(403, "You are not the owner of this coupon");

    return couponTransformer(coupon);
  }

  // A user redeems a promo from the business
  static async redeemPromo(
    idToken: string,
    businessId: string,
    promoId: string
  ): Promise<Coupon> {
    if (!businessId) throw new HttpException(400, "Must provide a business id");
    if (!promoId) throw new HttpException(400, "Must provide a promo id");

    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });
    if (!existingBusiness)
      throw new HttpException(
        400,
        `The business with id ${businessId} does not exist!`
      );

    const owner = await getUserFromIdToken(idToken);
    const ownerId = owner.id;

    const promo = await prisma.promotion.findUnique({
      where: { id: promoId },
      ...promotionQueryArgs,
    });
    if (!promo)
      throw new HttpException(
        400,
        `The promotion with id ${promoId} does not exist!`
      );

    if (promo.quantity <= 0) {
      throw new HttpException(400, "This promotion is out of stock");
    } else {
      await prisma.promotion.update({
        where: { id: promoId },
        data: { quantity: promo.quantity - 1 },
        ...promotionQueryArgs,
      });

      const newCoupon = await prisma.coupon.create({
        data: {
          promotionId: promoId,
          userId: ownerId,
        },
        ...couponQueryArgs,
      });
      return couponTransformer(newCoupon);
    }
  }

  // A business marks the coupon as used
  static async useCoupon(
    idToken: string,
    businessId: string,
    couponId: string
  ): Promise<Coupon> {
    if (!businessId) throw new HttpException(400, "Must provide a business id");
    if (!couponId) throw new HttpException(400, "Must provide a promo id");

    const existingBusiness = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });
    if (!existingBusiness)
      throw new HttpException(
        400,
        `The business with id ${businessId} does not exist!`
      );

    const owner = await getUserFromIdToken(idToken);
    const ownerId = owner.id;
    if (existingBusiness.ownerId !== ownerId)
      throw new HttpException(403, "You are not the owner of this business");

    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      ...couponQueryArgs,
    });
    if (!coupon)
      throw new HttpException(
        400,
        `The coupon with id ${couponId} does not exist!`
      );

    if (coupon.redeemedAt) throw new HttpException(400, "Coupon already used");

    const updatedCoupon = await prisma.coupon.update({
      where: { id: couponId },
      data: { redeemedAt: new Date() },
      ...couponQueryArgs,
    });
    return couponTransformer(updatedCoupon);
  }
}
