import * as UserModel from "../models/user";
import * as PersonModel from "../models/person";

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
    paternalLastName,
    maternalLastName,
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
  const { email } = req.params;
  const result = await UserModel.getByLogin(email);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { id, login, person_id, hash } = result.data;

  const data = {
    id,
    person_id,
    login,
    hash,
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

  res
    .status(200)
    .json({ success: true, data: "Eliminado correctamente", error: null });
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

    const resultInsertUser = await UserModel.insertUser(person_id, email);

    if (!resultInsertUser.success) {
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const data = {
      id: resultInsertUser.data.id,
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

  const resultGetByLogin = await UserModel.getByLogin(resultGetByRut.data.email);
  const person_id = resultGetByRut.data.id;

  if (!resultGetByLogin.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByLogin.error });
    return;
  }

  if (!resultGetByLogin.data) {
    const resultInsertUser = await UserModel.insertUser(person_id, email);

    if (!resultInsertUser.success) {
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertUser.error });
      return;
    }
    const data = {
      id: resultInsertUser.data.id,
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

export { upsert, getByRut, getByLogin, getAll, deleteById, getById };
