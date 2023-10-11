const express = require('express')
import reqLogger from "./middlewares/logger"

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
        console.log("Conectado correctamente")

    }

    routes() {
        this.server.use("/api-email/email", reqLogger, routes.EmailRouter);
        
        

    }
}

export default new App().server;