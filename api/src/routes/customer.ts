import { Router } from "express";
import * as CustomerController from "../controllers/customer";

const CustomerRouter = Router();

CustomerRouter.get("/getByRut/:rut", CustomerController.getByRut);
CustomerRouter.get("/getAll", CustomerController.getAll);
CustomerRouter.post("/upsert", CustomerController.upsert);
CustomerRouter.delete("/deleteById/:id", CustomerController.deleteById);

export default CustomerRouter;
