import { Router } from 'express';
import * as EmailController from '../controllers/email';

const EmailRouter = Router();


EmailRouter.post("/sendEmail/", EmailController.sendEmail);




export default EmailRouter;