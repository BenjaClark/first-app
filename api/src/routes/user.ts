import { Router } from "express";
import * as UserController from "../controllers/user";

const UserRouter = Router();

UserRouter.get("/getByRut/:rut", UserController.getByRut);
UserRouter.get("/getById/:id", UserController.getById);
UserRouter.get("/getByLogin/:login", UserController.getByLogin);
UserRouter.get("/getAll", UserController.getAll);
UserRouter.delete("/deleteById/:id", UserController.deleteById);
UserRouter.post("/upsert", UserController.upsert);

UserRouter.post("/assignPassword", UserController.assignPassword);
UserRouter.post("/validate", UserController.validate);
UserRouter.post("/updatePassword", UserController.updatePassword);
UserRouter.post("/sendPassword", UserController.sendPassword);

export default UserRouter;