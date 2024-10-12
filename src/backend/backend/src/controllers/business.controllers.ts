import { NextFunction, Request, Response } from "express";
import BusinessService from "../services/business.services";

export default class BusinessController {
  static async createNewBusiness(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, location, businessTypes, description } = req.body;

      const newBusiness = await BusinessService.createNewBusiness(
        name,
        location,
        businessTypes,
        description
      );
      res.status(201).json(newBusiness);
    } catch (err: unknown) {
      next(err);
    }
  }

  static async getAllBusinesses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const filterArgs = req.query; // No args defaults to all businesses

      const businesses = await BusinessService.getAllBusinesses(filterArgs);
      res.status(200).json(businesses);
    } catch (err: unknown) {
      next(err);
    }
  }

  static async getBusiness(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;

      const business = await BusinessService.getBusiness(businessId);
      res.status(200).json(business);
    } catch (err: unknown) {
      next(err);
    }
  }
}
