import * as UserModel from "../models/user";
import * as PersonModel from "../models/person";
import * as PersonService from "../services/person";
import axios from "axios";
import bcrypt from "bcrypt";
import config from "../utils/config";
import createLogger from "../utils/logger";

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await UserModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "user/getById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const {
    person_id,
    login,
    rut,
    name,
    paternallastname,
    maternallastname,
    address,
    district,
    email,
    phone,
  } = result.data;

  const data = {
    id,
    person_id,
    login,
    rut,
    name,
    paternalLastName: paternallastname,
    maternalLastName: maternallastname,
    address,
    district,
    email,
    phone,
  };

  createLogger.info({
    controller: "user/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await UserModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "user/getByRut",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const {
    id,
    person_id,
    login,
    name,
    paternallastname,
    maternallastname,
    address,
    district,
    email,
    phone,
  } = result.data;

  const data = {
    id,
    person_id,
    login,
    rut,
    name,
    paternalLastName: paternallastname,
    maternalLastName: maternallastname,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "user/getByRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByLogin = async (req: any, res: any) => {
  const { login } = req.params;
  const result = await UserModel.getByLogin(login);

  if (!result.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = {
    id: result.data.id,
    person_id: result.data.person_id,
    email: result.data.email,
    hash: result.data.hash,
  };
  createLogger.info({
    controller: "user/getByLogin",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await UserModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "user/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((user: any) => {
    return {
      id: user.id,
      person_id: user.person_id,
      login: user.email,
      rut: user.rut,
      name: user.name,
      paternalLastName: user.paternallastname,
      maternalLastName: user.maternallastname,
      address: user.address,
      district: user.district,
      email: user.email,
      phone: user.phone,
    };
  });
  createLogger.info({
    controller: "user/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await UserModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "user/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "user/deleteById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

const upsert = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = req.body;

  const personResult = await PersonService.upsert(req.body);

  if (!personResult.success) {
    createLogger.error({
      controller: "person/upsert",
      error: personResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: personResult.error });
  }

  if(!personResult.data){
    return res.status(500)
    .json({ success: false, data: null, error: "No data" });
  }
  
  const {id: person_id} = personResult.data;

  const resultGetByLogin = await UserModel.getByLogin(email);


  if (!resultGetByLogin.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: resultGetByLogin.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }

  if (!resultGetByLogin.data) {
    const resultInsert = await UserModel.insert(person_id, email);

    if (!resultInsert.success) {
      createLogger.error({
        model: "user/insert",
        error: resultInsert.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsert.error });
      return;
    }
    const data = {
      id: resultInsert.data.id,
      person_id: person_id,
      login: email,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    };
    createLogger.info({
      controller: "user/upsert",
      message: "OK",
    });
    res.status(200).json({ success: true, data, error: null });
    return;
  }

  const resultUpdate = await UserModel.updateById(person_id, email);
  if (!resultUpdate.success) {
    createLogger.error({
      model: "user/updateById",
      error: resultUpdate.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultUpdate.error });
    return;
  }
  const data = {
    id: resultUpdate.data.id,
    person_id: person_id,
    login: email,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  };
  createLogger.info({
    controller: "user/upsert",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const assignPassword = async (req: any, res: any) => {
  const { login, password } = req.body;

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: resultGetByLogin.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }

  if (!resultGetByLogin.data) {
    res.status(403).json({ error: "Usuario no valido" });
    return;
  }

  if (!resultGetByLogin.data.hash) {
    const user_id = resultGetByLogin.data.id;

    const result = await UserModel.assignPassword(user_id, password);

    if (!result.success) {
      createLogger.error({
        model: "user/assignPassword",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }
    createLogger.info({
      controller: "user/assignPassword",
      message: "OK",
    });
    res.status(200).json({
      success: true,
      data: "Contraseña modificada",
      error: result.error,
    });
    return;
  }
  res.status(403).json({
    success: true,
    data: "El usuario ya tiene Hash!",
    error: null,
  });
  return;
};

const validate = async (req: any, res: any) => {
  const { login, password } = req.body;

  if (!login || !password) {
    res.status(500).json({
      success: false,
      data: null,
      error: "Falta ingresar login o password",
    });
    return;
  }

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: resultGetByLogin.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }
  if (!resultGetByLogin.data) {
    res
      .status(403)
      .json({ success: false, data: null, error: "Usuario no valido" });
    return;
  }

  if (!resultGetByLogin.data.hash) {
    res.status(403).json({ error: "Usuario no valido" });
    return;
  }

  const hash = resultGetByLogin.data.hash;

  const isValid = await bcrypt.compare(password, resultGetByLogin.data.hash);
  if (!isValid) {
    res
      .status(403)
      .json({ success: false, data: null, error: "Usuario no valido" });
    return;
  }
  createLogger.info({
    controller: "user/validate",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: "Validado correctamente",
    error: null,
  });
  return;
};

const updatePassword = async (req: any, res: any) => {
  const { login, password, newPassword } = req.body;

  if (!login || !password || !newPassword) {
    res
      .status(500)
      .json({ success: false, data: null, error: "Falta ingresar datos" });
    return;
  }

  const resultGetByLogin = await UserModel.getByLogin(login);

  if (!resultGetByLogin.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: resultGetByLogin.error,
    });
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }

  if (!resultGetByLogin.data) {
    res
      .status(403)
      .json({ success: false, data: null, error: "Usuario no valido" });
    return;
  }

  if (!resultGetByLogin.data.hash) {
    res.status(403).json({ error: "Usuario no valido" });
    return;
  }

  const hash = resultGetByLogin.data.hash;
  const user_id = resultGetByLogin.data.id;

  const isValid = await bcrypt.compare(password, hash);
  if (!isValid) {
    res
      .status(403)
      .json({ success: false, data: null, error: "Usuario no valido" });
    return;
  }

  const result = await UserModel.assignPassword(user_id, newPassword);
  if (!result.success) {
    createLogger.error({
      model: "user/getByLogin",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "user/updatePassword",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: "Contraseña modificada",
    error: null,
  });
  return;
};

const generatePassword = (longitud: number): string => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newPassword = "";

  for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    newPassword += caracteres.charAt(indice);
  }

  return newPassword;
};

const sendPassword = async (req: any, res: any) => {
  try {
    const { login } = req.body;

    const resultGetByLogin = await UserModel.getByLogin(login);
    if (!resultGetByLogin.success) {
      createLogger.error({
        model: "user/getByLogin",
        error: resultGetByLogin.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultGetByLogin.error });
      return;
    }

    if (!resultGetByLogin.data) {
      res.status(403).json({ error: "Usuario no valido" });
      return;
    }

    const user_id = resultGetByLogin.data.id;
    const newPassword = generatePassword(5);

    const result = await UserModel.assignPassword(user_id, newPassword);

    if (!result.success) {
      createLogger.error({
        model: "user/assignPassword",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const resultSendEmail = await axios.post(
      `${config.apiEmailUrl}/email/email`,
      {
        to: login,
        subject: "Nueva contraseña",
        text: `Su nueva contraseña es: ${newPassword}`,
      }
    );

    const {
      success: sendMainSuccess,
      data: sendMainData,
      error: sendMainError,
    } = resultSendEmail.data;

    if (!sendMainSuccess) {
      createLogger.error({
        model: "email/send",
        error: sendMainError,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: sendMainError });
    }
    createLogger.info({
      controller: "user/sendPassword",
      message: "OK",
    });
    res.status(200).json({ success: true, data: sendMainData, error: null });
  } catch (e) {
    res
      .status(500)
      .json({ success: false, data: null, error: (e as Error).message });
  }
};

export {
  upsert,
  getByRut,
  getByLogin,
  getAll,
  deleteById,
  getById,
  assignPassword,
  validate,
  updatePassword,
  sendPassword,
};
