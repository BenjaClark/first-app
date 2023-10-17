import { Router } from "express";
import * as ProductController from "../controllers/product";

const ProductRouter = Router();

ProductRouter.get("/getByCode/:code", ProductController.getByCode);
ProductRouter.get("/getById/:id", ProductController.getById);
ProductRouter.get("/getAll", ProductController.getAll);
ProductRouter.post("/upsert", ProductController.upsert);
ProductRouter.delete("/deleteById/:id", ProductController.deleteById);

export default ProductRouter;