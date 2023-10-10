import nodemailer from "nodemailer";
import UtilsConfig from "../utils/config";

const sendEmail: any = async (login: string, newPassword: string) => {
  try {

    const { host, port, user, pass, from } = UtilsConfig.config;


    const config = {
      host,
      port,
      auth : {
        user,
        pass,
      },
    };

    const mensaje = {
      from,
      to : login,
      subject : "Solicitud de nueva contraseña",
      text : "Su nueva contraseña para iniciar sesión es: " + newPassword,
    };

    const transport = nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);

    return { success: true, data: info, error: null };
  } catch (e) {
    return { success: false, data: null, error: (e as Error).message };
  }
};

export { sendEmail }
