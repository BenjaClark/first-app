import * as EmailModel from "../models/email";


const sendEmail = async (req: any, res: any) => {

    const { login, newPassword} = req.body;

    const result : any = await EmailModel.sendEmail(login, newPassword);

    if(!result.success){
      res.status(500).json({ success: false, data: null , error: result.data });
  return;

    }
    res.status(200).json({ success: true, data: result.data , error: null });
  return;
}

export {sendEmail}