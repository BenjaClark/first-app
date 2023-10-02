import * as UserModel from "../models/user";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await UserModel.getByRut(rut);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const {
    id,
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
      hash: user.hash,
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

  const resultGetByRut = await UserModel.getByRut(rut);

  if (!resultGetByRut.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByRut.error });
    return;
  }
  

  if (!resultGetByRut.data) {
    const resultInsertPerson = await UserModel.insertPerson(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!resultInsertPerson.success) {
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertPerson.error });
      return;
    }

    const result = await UserModel.getByRut(rut);
    if (!result.success) {
      res
        .status(500)
        .json({ success: false, data: null, error: result.error });
      return;
    }

    const resultInsertUser = await UserModel.insertUser(
      result.data.id,
      result.data.email
    );

    if (!resultInsertUser.success) {
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertUser.error });
      return;
    }
    if (resultInsertUser.success) {
    res.status(200).json({ success: true, data: "Usuario y Persona insertados", error: null });
    return;
    }
  }

  const { hash, login } = req.body;

  const result = await UserModel.getByLogin(email);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    const resultInsertUser = await UserModel.insertUser(
      resultGetByRut.data.id,
      email
    );

    if (!resultInsertUser.success) {
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertUser.error });
      return;
    }
    if (resultInsertUser.success) {
      res.status(200).json({ success: true, data: "Usuario insertado", error: null });
      return;
    }
  }


  const resultUpdateById = await UserModel.updateById(
    resultGetByRut.data.id,
    "usuario editado",
    email
  );

  if (!resultUpdateById.success) {
    res.status(500).json({ success: false, data: null, error: resultUpdateById.error });
    return;
  }

  const data = {
    id: result.data.id,
    hash,
    login,
  };

  res.status(200).json({ success: true, data: "Usuario con id: "+data.id+" Editado", error: null });
  return;
};

export { upsert, getByRut, getByLogin, getAll, deleteById };
