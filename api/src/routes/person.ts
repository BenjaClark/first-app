import {Router} from "express";
import * as PersonController from "../controllers/person";

const PersonRouter = Router();

PersonRouter.get("/getByRut/:rut", PersonController.getByRut)
PersonRouter.get("/getById/:id", PersonController.getById)
PersonRouter.get("/getAll", PersonController.getAll)
PersonRouter.post("/upsert", PersonController.upsert)
PersonRouter.put("/deleteById", PersonController.deleteById)


export default PersonRouter;