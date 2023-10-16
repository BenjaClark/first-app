import express from "express";
import {reqLogger} from "./middlewares/logger"

import * as routes from "./routes"; 

class App {
    public server: any;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
 
    }

    routes() {
        this.server.use("/api/person", reqLogger, routes.PersonRouter);
        this.server.use("/api/user", reqLogger, routes.UserRouter);
        this.server.use("/api/company", reqLogger, routes.CompanyRouter);
        this.server.use("/api/customer", reqLogger, routes.CustomerRouter);
        this.server.use("/api/product", reqLogger, routes.ProductRouter);
        this.server.use("/api/invoice", reqLogger, routes.InvoiceRouter);

    }
}

export default new App().server;