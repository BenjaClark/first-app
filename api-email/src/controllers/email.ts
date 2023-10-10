import * as EmailModel from "../models/email";


const sendEmail = async (req: any, res: any) => {

    const { login, newPassword} = req.body;

    const result = sendEmail(login, newPassword);

    res.status(200).json({ success: true, data: result , error: null });
  return;
}

export {sendEmail}