import nodemailer from "nodemailer";

const sendEmail: any = async (login: string, newPassword: string) => {
  try {
    const config = {
      host : 'smtp.gmail.com',
      port : 587,
      auth : {
        user : "benja.vasquez017@gmail.com",
        pass : "tudq pupw cbgy ewsb",
      },
    };

    const mensaje = {
      from : "benja.vasquez017@gmail.com",
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
