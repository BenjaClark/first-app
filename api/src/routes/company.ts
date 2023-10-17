import { Router } from "express";
import * as CompanyController from "../controllers/company";

const CompanyRouter = Router();

CompanyRouter.get("/getByRut/:rut", CompanyController.getByRut);
CompanyRouter.get("/getById/:id", CompanyController.getById);
CompanyRouter.get("/getAll", CompanyController.getAll);
CompanyRouter.post("/upsert", CompanyController.upsert);
CompanyRouter.delete("/deleteById/:id", CompanyController.deleteById);

export default CompanyRouter;
