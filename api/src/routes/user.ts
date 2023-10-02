import {Router} from "express";
import * as UserController from "../controllers/user";

const UserRouter = Router();

UserRouter.get("/getByRut/:rut", UserController.getByRut)
UserRouter.get("/getById/:id", UserController.getById)
UserRouter.get("/getByLogin/:login", UserController.getByLogin)
UserRouter.get("/getAll", UserController.getAll)
UserRouter.post("/upsert", UserController.upsert)
UserRouter.delete("/deleteById/:id", UserController.deleteById)


export default UserRouter;