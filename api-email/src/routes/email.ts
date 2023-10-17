import { Router } from "express";

import * as EmailController from "../controllers/email";

const EmailRouter = Router();

EmailRouter.post("/email", EmailController.send);

export default EmailRouter;