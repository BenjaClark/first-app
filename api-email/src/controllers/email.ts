import * as EmailModel from "../models/email";


const send = async (req: any, res: any) => {

    const { to, subject, text } = req.body;

    const result : any = await EmailModel.send( to, subject, text );

    if(!result.success){
      res.status(500).json({ success: false, data: null , error: result.data });
  return;

    }
    res.status(200).json({ success: true, data: result.data , error: null });
  return;
}

export { send }