import { NextFunction, Request, Response } from "express";
import BusinessService from "../services/business.services";

export default class BusinessController {
  static async createNewBusiness(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { idToken } = req.cookies;
      const { name, location, businessTypes, description } = req.body;

      const newBusiness = await BusinessService.createBusiness(
        idToken,
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
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const businesses = await BusinessService.getAllBusinesses();
      res.status(200).json(businesses);
    } catch (err: unknown) {
      next(err);
    }
  }

  static async getBusinessTypes(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const businessTypes = await BusinessService.getBusinessTypes();

      res.status(200).json(businessTypes);
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

  static async editBusiness(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;
      const { name, location, businessTypes, description } = req.body;

      const newBusiness = await BusinessService.editBusiness(
        businessId,
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

  static async getPromos(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;

      const promos = await BusinessService.getPromos(businessId);
      res.status(200).json(promos);
    } catch (err: unknown) {
      next(err);
    }
  }

  static async createPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;
      const { type, value, quantity } = req.body;

      const promo = await BusinessService.createPromo(
        businessId,
        type,
        value,
        quantity
      );
      res.status(201).json(promo);
    } catch (err: unknown) {
      next(err);
    }
  }

  static async redeemCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      const businessId = req.params.businessId;
      const couponId = req.params.couponId;

      const promo = await BusinessService.redeemCoupon(businessId, couponId);
      res.status(200).json(promo);
    } catch (err: unknown) {
      next(err);
    }
  }
}
