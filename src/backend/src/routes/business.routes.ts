import { Router } from "express";
import BusinessController from "../controllers/business.controllers";

const businessRouter = Router();

businessRouter.post("/new", BusinessController.createNewBusiness);

businessRouter.get("/search", BusinessController.getAllBusinesses);

businessRouter.get("/:businessId/get", BusinessController.getBusiness);
businessRouter.get("/:businessId/edit", BusinessController.getBusiness);

businessRouter.get("/:businessId/promos", BusinessController.getBusiness);
businessRouter.get("/:businessId/promos/new", BusinessController.getBusiness);
businessRouter.get(
  "/:businessId/promos/:promoId/redeem",
  BusinessController.getBusiness
);

export default businessRouter;
