const express = require('express')

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
        this.server.use("/api-email/email", routes.EmailRouter);
        
        

    }
}

export default new App().server;