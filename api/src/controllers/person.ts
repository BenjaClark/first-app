import * as PersonModel from "../models/person";
import createLogger from "../utils/logger";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await PersonModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "person/getByRut",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
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
  createLogger.info({
    controller: "person/getByRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "person/getById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
    return;
  }

  const {
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
    controller: "person/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await PersonModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "person/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((person: any) => {
    return {
      id: person.id,
      rut: person.rut,
      name: person.name,
      paternalLastName: person.paternallastname,
      maternalLastName: person.maternallastname,
      address: person.address,
      district: person.district,
      email: person.email,
      phone: person.phone,
    };
  });
  createLogger.info({
    controller: "person/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
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
    createLogger.error({
      model: "person/getByRut",
      error: resultGetByRut.error,
    });
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
      createLogger.error({
        model: "person/insert",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const data = {
      id: result.data.id,
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
      controller: "person/upsert",
      message: "OK",
    });
    res.status(200).json({ success: true, data, error: null });
    return;
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
    createLogger.error({
      model: "person/updateById",
      error: result.error,
    });
    res.status(500).json({ success: false, result, error: result.error });
    return;
  }

  const data = {
    id: resultGetByRut.data.id,
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
    controller: "person/upsert",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "person/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "person/deleteById",
    message: "OK",
  });
  res
    .status(200)
    .json({
      success: true,
      data: result.data + " registro(s) eliminado(s)",
      error: null,
    });
  return;
};

export { getByRut, getById, getAll, upsert, deleteById };
