import nodemailer, { Transporter } from "nodemailer";

import config from "../utils/config";

const send: any = async (to: string, subject: string, text: string) => {
  try {
    const { host, port, user, pass, from } = config;

    const transportConfig = {
      host,
      port: parseInt(port),
      auth: { user, pass },
    };

    const mensaje = {
      from,
      to,
      subject,
      text,
    };

    const transport = nodemailer.createTransport(transportConfig);
    const info = await transport.sendMail(mensaje);

    return { success: true, data: info, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { send };