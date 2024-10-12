import { Router } from "express";
import BusinessController from "../controllers/business.controllers";

const businessRouter = Router();

businessRouter.post("/new", BusinessController.createNewBusiness);

businessRouter.get("/search", BusinessController.getAllBusinesses);
businessRouter.get("/:businessId/get", BusinessController.getBusiness);

export default businessRouter;
