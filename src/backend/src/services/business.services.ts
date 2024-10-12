import prisma from "../prisma/prisma";
import { Business, Promotion } from "../../../shared";
import { businessTransformer } from "../transformers/business.transformers";
import { promotionTransformer } from "../transformers/promotion.transformers";
import { stringToBusinessType } from "../utils/business.utils";
import { businessQueryArgs } from "../prisma-query-args/business.query-args";
import { HttpException } from "../utils/error.utils";
import { stringToPromotionType } from "../utils/promotion.utils";
import { promotionQueryArgs } from "../prisma-query-args/promotion.query-args";
import { couponQueryArgs } from "../prisma-query-args/coupon.query-args";

export default class BusinessService {
  static async createBusiness(
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

    const ownerId = "1"; // TODO: Get the owner id from the request

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

  static async getAllBusinesses(filterArgs): Promise<Business[]> {
    // TODO: Use filter args
    const businesses = await prisma.business.findMany({ ...businessQueryArgs });

    return businesses.map(businessTransformer);
  }

  static async getBusiness(businessId: string): Promise<Business> {
    if (!businessId)
      throw new HttpException(400, "Cannot get a business without an id");

    const business = await prisma.business.findUnique({
      where: { id: businessId },
      ...businessQueryArgs,
    });

    return businessTransformer(business);
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
    businessId: string,
    type: string,
    value: number,
    quantity: number
  ): Promise<Promotion> {
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

    const createdPromo = await prisma.promotion.create({
      data: {
        businessId,
        type: stringToPromotionType(type),
        value,
        quantity,
      },
      include: promotionQueryArgs.include,
    });

    return promotionTransformer(createdPromo);
  }

  static async redeemCoupon(
    businessId: string,
    couponId: string
  ): Promise<boolean> {
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

    // Check that the logged in user is the owner of the business
    // TODO

    const coupon = await prisma.coupon.findUnique({
      where: { id: couponId },
      ...couponQueryArgs,
    });
    if (!coupon)
      throw new HttpException(
        400,
        `The coupon with id ${couponId} does not exist!`
      );

    // Check if the coupon is already redeemed

    return true; // TODO: Implement the redeem coupon logic
  }
}
