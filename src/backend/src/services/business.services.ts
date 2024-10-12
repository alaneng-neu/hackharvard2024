import { Business } from "../../../shared";
import { businessQueryArgs } from "../prisma-query-args/business.query-args";
import prisma from "../prisma/prisma";
import { businessTransformer } from "../transformers/business.transformers";
import { stringToBusinessType } from "../utils/business.utils";
import { HttpException } from "../utils/error.utils";

export default class BusinessService {
  static async createNewBusiness(
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
}
