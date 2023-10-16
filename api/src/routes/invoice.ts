import {Router} from "express";
import * as InvoiceController from "../controllers/invoice";

const InvoiceRouter = Router();

InvoiceRouter.get("/getByCustomerRut/:rut", InvoiceController.getByCustomerRut)
InvoiceRouter.get("/getById/:id", InvoiceController.getById)
InvoiceRouter.get("/getAll", InvoiceController.getAll)
InvoiceRouter.post("/upsert", InvoiceController.upsert)
InvoiceRouter.delete("/deleteById/:id", InvoiceController.deleteById)


export default InvoiceRouter;