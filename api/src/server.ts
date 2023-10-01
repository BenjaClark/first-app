import express from "express";

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
        this.server.use("/api/person", routes.PersonRouter);
        this.server.use("/api/user", routes.UserRouter);
        

    }
}

export default new App().server;

