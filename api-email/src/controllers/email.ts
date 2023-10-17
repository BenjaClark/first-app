import * as EmailModel from "../models/email";
import createLogger from "../utils/logger";

const send = async (req: any, res: any) => {
  const { to, subject, text } = req.body;

  const result: any = await EmailModel.send(to, subject, text);

  if (!result.success) {
    createLogger.error({
      model: "email/send",
      error: result.error,
    });

    res.status(500).json({ success: false, data: null, error: result.data });
    return;
  }

  createLogger.info({
    controller: "email/send",
    message: "OK",
  });

  res.status(200).json({ success: true, data: result.data, error: null });
  return;
};

export { send };
