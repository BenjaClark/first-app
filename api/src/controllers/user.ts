import * as UserModel from "../models/user";
import * as PersonModel from "../models/person";
import * as EmailModel from "../../../api-email/src/models/email"
import bcrypt from "bcrypt";

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await UserModel.getById(id);

  if (!result.success) {
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await UserModel.getByRut(rut);

  if (!result.success) {
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByLogin = async (req: any, res: any) => {
  const { login } = req.params;
  const result = await UserModel.getByLogin(login);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = {
    id: result.data.id,
    person_id: result.data.person_id,
    email: result.data.email,
    hash: result.data.hash,
  };

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await UserModel.getAll();

  if (!result.success) {
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await UserModel.deleteById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

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

  const resultGetByRut = await PersonModel.getByRut(rut);

  if (!resultGetByRut.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByRut.error });
    return;
  }

  if (!resultGetByRut.data) {
    const result = await PersonModel.insert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!result.success) {
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const person_id = result.data.id;

    const resultInsert = await UserModel.insert(person_id, email);

    if (!resultInsert.success) {
      res.status(500).json({ success: false, data: null, error: result.error });
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

    if (result.success) {
      res.status(200).json({
        success: true,
        data,
        error: null,
      });
      return;
    }
  }

  const result = await PersonModel.updateById(
    resultGetByRut.data.id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone
  );

  if (!result.success) {
    res.status(500).json({ success: false, result, error: result.error });
    return;
  }

  const resultGetByLogin = await UserModel.getByLogin(
    resultGetByRut.data.email
  );
  const person_id = resultGetByRut.data.id;

  if (!resultGetByLogin.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }

  if (!resultGetByLogin.data) {
    const resultInsert = await UserModel.insert(person_id, email);

    if (!resultInsert.success) {
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

    res.status(200).json({ success: true, data, error: null });
    return;
  }

  const resultUpdate = await UserModel.updateById(person_id, email);
  if (!resultUpdate.success) {
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const assignPassword = async (req: any, res: any) => {
  const { login, password } = req.body;

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.success) {
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

    const result = await UserModel.assignPasword(user_id, password);

    if (!result.success) {
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({
      success: true,
      data: "Contraseña modificada",
      error: result.error,
    });
    return;
  }
  res.status(200).json({
    success: true,
    data: "El usuario ya tiene Hash!",
    error: null,
  });
  return;
};

const validate = async (req: any, res: any) => {
  const { login, password } = req.body;

  if(!login || !password){
    res
      .status(500)
      .json({ success: false, data: null, error: "Falta ingresar login o password" });
    return;
  }

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.data) {
    res
      .status(500)
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

  res.status(200).json({
    success: true,
    data: "Validado correctamente",
    error: null,
  });
  return;
};

const updatePassword = async (req: any, res: any) => {
  const { login, password, newPassword } = req.body;

  if(!login || !password || !newPassword){
    res
      .status(500)
      .json({ success: false, data: null, error: "Falta ingresar datos" });
    return;
  }

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.data) {
    res
      .status(500)
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

  const result = await UserModel.assignPasword(user_id, newPassword);
  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

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
  const { login } = req.body;

  const resultGetByLogin = await UserModel.getByLogin(login);
  if (!resultGetByLogin.success) {
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
    res.status(403).json({ error: "El Usuario no tiene contraseña" });
    return;
  }

  const user_id = resultGetByLogin.data.id;
  const newPassword = generatePassword(5);

  const result = await UserModel.assignPasword(user_id, newPassword);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  };
  
  const resultSendEmail = await EmailModel.sendEmail(login, newPassword)
  if(!resultSendEmail.success) {
    res.status(500).json({ success: false, data: null, error: resultSendEmail.error});
  };
  
  res.status(200).json({ success: true, data: "Se ha enviado un correo con su nueva contraseña", error: null});
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
  sendPassword
};
